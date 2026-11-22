import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";
import { cutoutSrcSet } from "@/lib/cutouts";
import { cn } from "@/lib/utils";

export function tint(color: string, amount = 22) {
  return `color-mix(in oklab, ${color} ${amount}%, var(--card))`;
}

/** Card grids: 2 columns on phones, 3 from md, 4 from lg, inside a 1280px container. */
const CARD_SIZES = "(min-width: 1280px) 300px, (min-width: 1024px) 23vw, (min-width: 768px) 31vw, 47vw";
const IMG = "absolute inset-0 size-full object-contain px-[12%] pb-[6%] pt-[4%] drop-shadow-[0_18px_18px_rgba(0,0,0,0.14)] transition duration-500 ease-out motion-reduce:transition-none";

export function ProductTile({
  product,
  className,
  swap = true,
  priority = false,
  sizes = CARD_SIZES,
}: {
  product: Product;
  className?: string;
  swap?: boolean;
  /** Above-the-fold card that may be the LCP image: load eagerly at high priority. */
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn("relative aspect-[4/5] overflow-hidden rounded-lg", className)} style={{ background: tint(product.color) }}>
      <div aria-hidden className="absolute inset-x-0 top-[9%] h-px bg-foreground/10" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.images.front}
        srcSet={cutoutSrcSet(product.images.front)}
        sizes={sizes}
        alt={`${product.name} in ${product.colorName}, front`}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className={cn(IMG, swap && "[@media(hover:hover)]:group-hover:scale-[1.03] [@media(hover:hover)]:group-hover:opacity-0")}
      />
      {swap && (
        // The back view only appears on hover, so it isn't rendered at all on touch screens:
        // a lazy image inside display:none is never fetched.
        <div aria-hidden className="hidden [@media(hover:hover)]:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images.back}
            srcSet={cutoutSrcSet(product.images.back)}
            sizes={sizes}
            alt=""
            loading="lazy"
            fetchPriority="low"
            decoding="async"
            className={cn(IMG, "scale-[0.97] opacity-0 group-hover:scale-100 group-hover:opacity-100")}
          />
        </div>
      )}
    </div>
  );
}

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block outline-none">
      <div className="relative">
        <ProductTile product={product} priority={priority} className="transition-shadow duration-300 group-focus-visible:ring-2 group-focus-visible:ring-ring" />
        {product.isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]">
            New
          </span>
        )}
        <span className="absolute bottom-3 right-3 translate-y-2 rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none">
          View piece
        </span>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium">{product.name}</h3>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
            <span aria-hidden className="inline-block size-2.5 rounded-full ring-1 ring-foreground/15" style={{ background: product.color }} />
            {product.colorName}
          </p>
        </div>
        <p className="text-sm tabular-nums">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
