"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCart, type ResolvedLine } from "@/lib/cart";
import { FREE_SHIPPING_THRESHOLD, formatPrice } from "@/lib/products";
import { tint } from "@/components/site/product-card";
import { cutoutAt } from "@/lib/cutouts";
import { cn } from "@/lib/utils";

export function ShippingProgress({ subtotal }: { subtotal: number }) {
  const left = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  return (
    <div>
      <p className="text-sm">
        {left > 0 ? (
          <>
            You&apos;re <span className="font-medium tabular-nums">{formatPrice(left)}</span> away from free shipping.
          </>
        ) : (
          <>Free shipping unlocked.</>
        )}
      </p>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)} aria-label="Progress to free shipping">
        <div className="h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function QuantityStepper({ line, small }: { line: ResolvedLine; small?: boolean }) {
  const { setQty } = useCart();
  const btn = cn("inline-flex items-center justify-center rounded-full hover:bg-muted disabled:opacity-40", small ? "size-7" : "size-8");
  return (
    <div className="inline-flex items-center rounded-full border border-border">
      <button type="button" className={btn} onClick={() => setQty(line.key, line.qty - 1)} aria-label={`Decrease quantity of ${line.product.name}`}>
        <Minus className="size-3.5" />
      </button>
      <span className="w-6 text-center text-sm tabular-nums" aria-live="polite">{line.qty}</span>
      <button type="button" className={btn} onClick={() => setQty(line.key, line.qty + 1)} disabled={line.qty >= 10} aria-label={`Increase quantity of ${line.product.name}`}>
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}

export function CartLineRow({ line, onNavigate, large }: { line: ResolvedLine; onNavigate?: () => void; large?: boolean }) {
  const { remove } = useCart();
  const p = line.product;
  return (
    <li className="flex gap-4 py-4">
      <Link
        href={`/shop/${p.slug}`}
        onClick={onNavigate}
        className={cn("relative shrink-0 overflow-hidden rounded-md", large ? "h-36 w-28" : "h-24 w-20")}
        style={{ background: tint(p.color) }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cutoutAt(p.images.front, 320)} alt={`${p.name} in ${p.colorName}`} loading="lazy" decoding="async" className="absolute inset-0 size-full object-contain p-2" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link href={`/shop/${p.slug}`} onClick={onNavigate} className="text-sm font-medium hover:underline">
              {p.name}
            </Link>
            <p className="text-sm text-muted-foreground">
              {p.colorName} · Size {line.size}
            </p>
          </div>
          <p className="text-sm tabular-nums">{formatPrice(line.total)}</p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <QuantityStepper line={line} small={!large} />
          <button type="button" onClick={() => remove(line.key)} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <X className="size-3.5" /> Remove
          </button>
        </div>
      </div>
    </li>
  );
}
