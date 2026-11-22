"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CartLineRow, ShippingProgress } from "@/components/site/cart-parts";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export function CartSheet() {
  const { lines, count, subtotal, open, setOpen } = useCart();
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 bg-background p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="font-display text-3xl font-normal tracking-tight">Your bag</SheetTitle>
          <SheetDescription>{count ? `${count} ${count === 1 ? "piece" : "pieces"}` : "Nothing on your hanger yet."}</SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="inline-flex size-14 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="size-6 text-muted-foreground" />
            </span>
            <p className="max-w-[26ch] text-sm text-muted-foreground">Your bag is empty. Pick something off the rail and it&apos;ll show up here.</p>
            <Button asChild className="rounded-full px-6" onClick={close}>
              <Link href="/shop">Browse the rail</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="border-b border-border px-6 py-4">
              <ShippingProgress subtotal={subtotal} />
            </div>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {lines.map((line) => (
                <CartLineRow key={line.key} line={line} onNavigate={close} />
              ))}
            </ul>
            <div className="border-t border-border px-6 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-base font-medium tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Taxes and shipping calculated at checkout.</p>
              <div className="mt-4 grid gap-2">
                <Button asChild size="lg" className="h-12 rounded-full" onClick={close}>
                  <Link href="/bag">View bag &amp; check out</Link>
                </Button>
                <Button variant="ghost" className="rounded-full" onClick={close}>
                  Keep browsing
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
