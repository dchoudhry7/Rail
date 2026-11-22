import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Leaf, RotateCcw, Truck } from "lucide-react";
import { ProductGallery } from "@/components/site/product-gallery";
import { AddToBag } from "@/components/site/add-to-bag";
import { ShopRail } from "@/components/site/shop-rail";
import { CATEGORIES, PRODUCTS, formatPrice, getProduct } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };
  return { title: `${product.name}, ${product.colorName}`, description: product.description };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = CATEGORIES.find((c) => c.id === product.category)!;
  const index = PRODUCTS.indexOf(product);
  // The neighbours on the rail, starting with this category.
  const pairings = [
    ...PRODUCTS.filter((p) => p.category === product.category && p !== product),
    ...PRODUCTS.slice(index + 1),
    ...PRODUCTS.slice(0, index),
  ]
    .filter((p, i, all) => p !== product && all.indexOf(p) === i)
    .slice(0, 6);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          <Link href="/shop" className="hover:text-foreground">Shop</Link> /{" "}
          <Link href={`/shop?category=${category.id}`} className="hover:text-foreground">{category.label}</Link> / {product.name}
        </p>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <ProductGallery product={product} />

          <div className="lg:sticky lg:top-32 lg:self-start">
            {product.isNew && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">New on the rail</p>}
            <h1 className="font-display text-5xl leading-none tracking-tight sm:text-6xl">{product.name}</h1>
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="flex items-center gap-2 text-muted-foreground">
                <span aria-hidden className="inline-block size-3.5 rounded-full ring-1 ring-foreground/15" style={{ background: product.color }} />
                {product.colorName}
              </p>
              <p className="text-xl tabular-nums">{formatPrice(product.price)}</p>
            </div>
            <p className="mt-6 leading-relaxed text-muted-foreground">{product.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {product.details.map((d) => (
                <li key={d} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{d}</li>
              ))}
            </ul>

            <div className="mt-8">
              <AddToBag product={product} />
            </div>

            <ul className="mt-6 grid gap-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Truck className="size-4" /> Free shipping over $100, ships in 1–2 days</li>
              <li className="flex items-center gap-2"><RotateCcw className="size-4" /> Free 30-day returns and exchanges</li>
              <li className="flex items-center gap-2"><Leaf className="size-4" /> Made in Porto from natural fibres</li>
            </ul>

            <div className="mt-8 divide-y divide-border border-y border-border">
              {[
                ["Fabric", product.fabric],
                ["Fit", product.fit],
                ["Care", product.care],
              ].map(([title, body], i) => (
                <details key={title} className="group py-4" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium [&::-webkit-details-marker]:hidden">
                    {title}
                    <span aria-hidden className="text-lg leading-none text-muted-foreground transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="mt-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 pt-16 text-center sm:px-6">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Next to it on the rail</p>
          <h2 className="font-display text-4xl tracking-tight sm:text-5xl">Hangs well with</h2>
        </div>
        <ShopRail products={pairings} caption="Hover or tap a piece. Click to lift it off the rail." className="!bg-transparent" />
      </section>
    </>
  );
}
