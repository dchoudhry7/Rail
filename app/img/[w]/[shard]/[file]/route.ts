import sharp from "sharp";
import { PRODUCTS } from "@/lib/products";
import { CUTOUT_WIDTHS, parseCutout } from "@/lib/cutouts";

// Every resized cut-out is generated at build time and served as a static file. Unknown
// widths or paths 404 (dynamicParams = false), so this can't be used as an image proxy.
export const dynamic = "force-static";
export const dynamicParams = false;

const UPSTREAM = "https://cdn.21st.dev/assets/mirror";

export function generateStaticParams() {
  const sources = new Set(PRODUCTS.flatMap((p) => [p.images.front, p.images.back, p.images.side]));
  return [...sources].flatMap((src) => {
    const c = parseCutout(src);
    return c ? CUTOUT_WIDTHS.map((w) => ({ w: String(w), shard: c.shard, file: c.file })) : [];
  });
}

export async function GET(_req: Request, { params }: { params: Promise<{ w: string; shard: string; file: string }> }) {
  const { w, shard, file } = await params;
  const width = Number(w);
  if (!CUTOUT_WIDTHS.includes(width as (typeof CUTOUT_WIDTHS)[number]) || !parseCutout(`/cdn/${shard}/${file}`)) {
    return new Response("Not found", { status: 404 });
  }
  const upstream = await fetch(`${UPSTREAM}/${shard}/${file}`, { cache: "force-cache" });
  if (!upstream.ok) return new Response("Not found", { status: 404 });

  const resized = await sharp(Buffer.from(await upstream.arrayBuffer()))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 78, alphaQuality: 90, effort: 5 })
    .toBuffer();

  return new Response(new Uint8Array(resized), {
    headers: { "Content-Type": "image/webp", "Cache-Control": "public, max-age=31536000, immutable" },
  });
}
