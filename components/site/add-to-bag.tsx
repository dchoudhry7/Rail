"use client";

import * as React from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

export function SizePicker({
  sizes,
  value,
  onChange,
  compact,
}: {
  sizes: string[];
  value: string | null;
  onChange: (size: string) => void;
  compact?: boolean;
}) {
  return (
    <div role="radiogroup" aria-label="Size" className="flex flex-wrap gap-2">
      {sizes.map((size) => {
        const selected = value === size;
        return (
          <button
            key={size}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(size)}
            className={cn(
              "rounded-full border text-sm tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              compact ? "h-8 min-w-10 px-3" : "h-11 min-w-14 px-4",
              selected ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground/60",
            )}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}

export function AddToBag({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = React.useState<string | null>(null);
  const [nudge, setNudge] = React.useState(false);
  const [added, setAdded] = React.useState(false);

  React.useEffect(() => {
    if (!added) return;
    const t = window.setTimeout(() => setAdded(false), 1800);
    return () => window.clearTimeout(t);
  }, [added]);

  return (
    <div className="space-y-5">
      <div>
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-medium">Size</span>
          <span className={cn("text-muted-foreground transition-colors", nudge && "text-accent")}>
            {size ? `Selected: ${size}` : "Choose a size"}
          </span>
        </div>
        <SizePicker
          sizes={product.sizes}
          value={size}
          onChange={(s) => {
            setSize(s);
            setNudge(false);
          }}
        />
      </div>
      <button
        type="button"
        onClick={() => {
          if (!size) {
            setNudge(true);
            return;
          }
          add(product.slug, size);
          setAdded(true);
        }}
        className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm font-medium text-background transition hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {added ? <Check className="size-4" /> : <ShoppingBag className="size-4" />}
        {added ? "Added to bag" : `Add to bag · ${formatPrice(product.price)}`}
      </button>
    </div>
  );
}
