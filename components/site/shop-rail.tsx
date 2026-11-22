"use client";

import * as React from "react";
import { createPortal, preload } from "react-dom";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import ClothingRailHero, { type ClothingRailHeroProps } from "@/components/ui/product-rail-gallery";
import { SizePicker } from "@/components/site/add-to-bag";
import { useCart } from "@/lib/cart";
import { formatPrice, toRailGarment, type Product } from "@/lib/products";
import { cutoutAt, cutoutSrcSet } from "@/lib/cutouts";

type ShopRailProps = Omit<ClothingRailHeroProps, "items" | "onOpenChange"> & { products: Product[] };

/** Resized copies of the CDN cut-outs (see app/img), for the rail's srcset and masks. */
const cutoutVariants = (src: string) => {
  const srcSet = cutoutSrcSet(src);
  return srcSet ? { srcSet, small: cutoutAt(src, 320) } : undefined;
};

/**
 * Wraps the clothing rail so a piece lifted off the rail can go straight into the bag.
 * While the rail's detail view is open, a quick-add bar floats above it.
 */
export function ShopRail({ products, ...props }: ShopRailProps) {
  const items = React.useMemo(() => products.map(toRailGarment), [products]);

  // An autoplaying rail is the hero. Its first piece faces front: React already preloads that
  // photo (it's a high-priority <img> with a srcset in the server HTML), so only the small copy
  // used by its blurred shadow (the page's LCP element) is preloaded here. crossOrigin matches
  // the CORS-mode mask request so the two share one fetch.
  const first = products[0];
  if (props.autoplay && first) {
    preload(cutoutAt(first.images.front, 320), { as: "image", crossOrigin: "anonymous", fetchPriority: "high" });
  }
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const product = openIndex === null ? null : products[openIndex];

  return (
    <>
      <ClothingRailHero items={items} hanger="none" onOpenChange={setOpenIndex} imageVariants={cutoutVariants} {...props} />
      {product && <QuickAdd key={product.slug} product={product} />}
    </>
  );
}

function QuickAdd({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = React.useState<string | null>(null);
  const [added, setAdded] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-center p-4 sm:p-6">
      <div className="pointer-events-auto flex w-full max-w-2xl animate-in flex-col gap-3 rounded-2xl border border-border bg-card/95 p-3 pl-4 text-card-foreground shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-md fade-in slide-in-from-bottom-4 duration-500 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex min-w-0 items-center justify-between gap-3 sm:block">
          <p className="truncate text-sm font-medium">
            {product.name} · {product.colorName}
          </p>
          <Link href={`/shop/${product.slug}`} className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            Full details <ArrowRight className="size-3" />
          </Link>
        </div>
        <div className="sm:ml-auto">
          <SizePicker sizes={product.sizes} value={size} onChange={(s) => { setSize(s); setAdded(false); }} compact />
        </div>
        <button
          type="button"
          disabled={!size || added}
          onClick={() => {
            if (!size) return;
            // Don't open the bag drawer on top of the rail's own modal.
            add(product.slug, size, 1, false);
            setAdded(true);
          }}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition enabled:hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {added ? <Check className="size-4" /> : null}
          {added ? "Added" : size ? `Add · ${formatPrice(product.price)}` : "Pick a size"}
        </button>
      </div>
    </div>,
    document.body,
  );
}
