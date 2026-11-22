"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Lock, ShoppingBag } from "lucide-react";
import { CartLineRow, ShippingProgress } from "@/components/site/cart-parts";
import { ProductCard } from "@/components/site/product-card";
import { useCart } from "@/lib/cart";
import { FREE_SHIPPING_THRESHOLD, PRODUCTS, formatPrice } from "@/lib/products";

const SHIPPING = 8;

export default function BagPage() {
  const { lines, subtotal, count } = useCart();
  const [notice, setNotice] = React.useState(false);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING;
  const inBag = new Set(lines.map((l) => l.slug));
  const suggestions = PRODUCTS.filter((p) => !inBag.has(p.slug)).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
      <h1 className="font-display text-6xl leading-none tracking-tight sm:text-7xl">Your bag</h1>
      <p className="mt-3 text-muted-foreground">{count ? `${count} ${count === 1 ? "piece" : "pieces"} ready to go.` : "Nothing here yet."}</p>

      {lines.length === 0 ? (
        <div className="mt-10 flex flex-col items-start gap-5 rounded-2xl border border-dashed border-border p-10">
          <ShoppingBag className="size-8 text-muted-foreground" />
          <p className="max-w-md text-muted-foreground">Your bag is empty. Head back to the rail and lift something off it.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background">
            Browse the rail <ArrowRight className="size-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <ul className="divide-y divide-border border-y border-border">
            {lines.map((line) => (
              <CartLineRow key={line.key} line={line} large />
            ))}
          </ul>

          <aside className="h-fit rounded-2xl bg-secondary/70 p-6 lg:sticky lg:top-32">
            <h2 className="text-sm font-medium uppercase tracking-[0.16em]">Summary</h2>
            <div className="mt-5">
              <ShippingProgress subtotal={subtotal} />
            </div>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="tabular-nums">{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd className="tabular-nums">{shipping ? formatPrice(shipping) : "Free"}</dd></div>
              <div className="flex justify-between border-t border-border pt-3 text-base font-medium"><dt>Total</dt><dd className="tabular-nums">{formatPrice(subtotal + shipping)}</dd></div>
            </dl>
            <button
              type="button"
              onClick={() => setNotice(true)}
              className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-medium text-background transition hover:bg-foreground/90"
            >
              <Lock className="size-4" /> Check out
            </button>
            {notice && (
              <p role="status" className="mt-3 rounded-lg bg-background p-3 text-xs leading-relaxed text-muted-foreground">
                This is a demo storefront, so checkout isn&apos;t connected yet. You could wire in Stripe Checkout or Shopify here.
              </p>
            )}
            <p className="mt-4 text-center text-xs text-muted-foreground">Free returns within 30 days.</p>
          </aside>
        </div>
      )}

      {suggestions.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-8 font-display text-4xl tracking-tight">You might also like</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {suggestions.map((p, i) => (
              <ProductCard key={p.slug} product={p} priority={lines.length === 0 && i < 2} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
