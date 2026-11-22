"use client";

import * as React from "react";
import { getProduct, type Product } from "@/lib/products";

export interface CartLine {
  slug: string;
  size: string;
  qty: number;
}

export interface ResolvedLine extends CartLine {
  key: string;
  product: Product;
  total: number;
}

interface CartContextValue {
  lines: ResolvedLine[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  /** Adds a line; opens the bag drawer unless `openBag` is false. */
  add: (slug: string, size: string, qty?: number, openBag?: boolean) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
}

const CartContext = React.createContext<CartContextValue | null>(null);
const STORAGE_KEY = "rail-bag-v1";

const lineKey = (slug: string, size: string) => `${slug}::${size}`;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [raw, setRaw] = React.useState<CartLine[]>([]);
  const [open, setOpen] = React.useState(false);
  // Don't write to storage until the saved bag has been read back, or the empty
  // initial state would overwrite it.
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartLine[];
        if (Array.isArray(parsed)) setRaw(parsed.filter((l) => getProduct(l.slug) && l.qty > 0));
      }
    } catch {
      /* storage unavailable */
    }
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));
    } catch {
      /* storage unavailable */
    }
  }, [raw, hydrated]);

  const add = React.useCallback((slug: string, size: string, qty = 1, openBag = true) => {
    setRaw((prev) => {
      const key = lineKey(slug, size);
      const existing = prev.find((l) => lineKey(l.slug, l.size) === key);
      if (existing) return prev.map((l) => (l === existing ? { ...l, qty: Math.min(10, l.qty + qty) } : l));
      return [...prev, { slug, size, qty }];
    });
    if (openBag) setOpen(true);
  }, []);

  const setQty = React.useCallback((key: string, qty: number) => {
    setRaw((prev) =>
      qty <= 0
        ? prev.filter((l) => lineKey(l.slug, l.size) !== key)
        : prev.map((l) => (lineKey(l.slug, l.size) === key ? { ...l, qty: Math.min(10, qty) } : l)),
    );
  }, []);

  const remove = React.useCallback((key: string) => {
    setRaw((prev) => prev.filter((l) => lineKey(l.slug, l.size) !== key));
  }, []);

  const clear = React.useCallback(() => setRaw([]), []);

  const value = React.useMemo<CartContextValue>(() => {
    const lines: ResolvedLine[] = [];
    for (const l of raw) {
      const product = getProduct(l.slug);
      if (product) lines.push({ ...l, key: lineKey(l.slug, l.size), product, total: product.price * l.qty });
    }
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.total, 0),
      open,
      setOpen,
      add,
      setQty,
      remove,
      clear,
    };
  }, [raw, open, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
