"use client";

import * as React from "react";
import type { Product } from "@/lib/products";
import { cutoutAt, cutoutSrcSet } from "@/lib/cutouts";
import { tint } from "@/components/site/product-card";
import { cn } from "@/lib/utils";

const VIEWS = ["front", "back", "side"] as const;
type View = (typeof VIEWS)[number];

export function ProductGallery({ product }: { product: Product }) {
  const [view, setView] = React.useState<View>("front");

  return (
    <div className="grid gap-3 md:grid-cols-[88px_1fr]">
      <div role="tablist" aria-label="Product views" className="order-2 flex gap-3 md:order-1 md:flex-col">
        {VIEWS.map((v) => (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={view === v}
            aria-label={`${v} view`}
            onClick={() => setView(v)}
            className={cn(
              "relative aspect-[4/5] w-20 overflow-hidden rounded-md ring-offset-2 ring-offset-background transition md:w-full",
              view === v ? "ring-2 ring-foreground" : "opacity-70 hover:opacity-100",
            )}
            style={{ background: tint(product.color) }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cutoutAt(product.images[v], 320)} alt="" decoding="async" className="absolute inset-0 size-full object-contain p-1.5" />
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        className="relative order-1 aspect-[4/5] overflow-hidden rounded-xl md:order-2"
        style={{ background: tint(product.color, 26) }}
      >
        <div aria-hidden className="absolute inset-x-0 top-[8%] h-[5px] bg-gradient-to-b from-foreground/20 to-foreground/5" />
        {VIEWS.map((v) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={v}
            src={product.images[v]}
            srcSet={cutoutSrcSet(product.images[v])}
            // Drawn at ~72% of the panel width (px-[14%]); the panel is ~55% of 1232px on desktop.
            sizes="(min-width: 1280px) 400px, (min-width: 1024px) 32vw, 72vw"
            alt={v === view ? `${product.name} in ${product.colorName}, ${v} view` : ""}
            aria-hidden={v !== view}
            // The front view is this page's LCP image; the other two start hidden.
            loading={v === "front" ? "eager" : "lazy"}
            fetchPriority={v === "front" ? "high" : "low"}
            decoding="async"
            className={cn(
              "absolute inset-0 size-full object-contain px-[14%] pb-[5%] pt-[5%] drop-shadow-[0_24px_24px_rgba(0,0,0,0.16)] transition duration-500 ease-out motion-reduce:transition-none",
              v === view ? "scale-100 opacity-100" : "scale-[0.98] opacity-0",
            )}
          />
        ))}
        <span className="absolute bottom-4 left-4 rounded-full bg-background/85 px-3 py-1 text-xs capitalize backdrop-blur">{view}</span>
      </div>
    </div>
  );
}
