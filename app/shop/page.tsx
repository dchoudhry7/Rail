import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/site/product-card";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/products";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Shop" };

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "new", label: "Newest" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
] as const;

type SortId = (typeof SORTS)[number]["id"];

function href(category: string | undefined, sort: SortId) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (sort !== "featured") params.set("sort", sort);
  const qs = params.toString();
  return qs ? `/shop?${qs}` : "/shop";
}

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string; sort?: string }> }) {
  const { category: rawCategory, sort: rawSort } = await searchParams;
  const category = CATEGORIES.find((c) => c.id === rawCategory)?.id as Category | undefined;
  const sort: SortId = SORTS.some((s) => s.id === rawSort) ? (rawSort as SortId) : "featured";

  let products = category ? PRODUCTS.filter((p) => p.category === category) : [...PRODUCTS];
  if (sort === "price-asc") products = products.toSorted((a, b) => a.price - b.price);
  if (sort === "price-desc") products = products.toSorted((a, b) => b.price - a.price);
  if (sort === "new") products = products.toSorted((a, b) => Number(!!b.isNew) - Number(!!a.isNew));

  const active = CATEGORIES.find((c) => c.id === category);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
      <header className="flex flex-col gap-4 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link> / {active ? <Link href="/shop" className="hover:text-foreground">Shop</Link> : "Shop"}
            {active && ` / ${active.label}`}
          </p>
          <h1 className="font-display text-6xl leading-none tracking-tight sm:text-7xl">{active ? active.label : "The whole rail"}</h1>
          <p className="mt-3 text-muted-foreground">{active ? active.blurb : "Every piece we make, in one place."}</p>
        </div>
        <p className="text-sm text-muted-foreground tabular-nums">
          {products.length} {products.length === 1 ? "piece" : "pieces"}
        </p>
      </header>

      <div className="sticky top-[6.5rem] z-20 -mx-4 flex flex-col gap-3 bg-background/95 px-4 py-4 md:bg-background/90 md:backdrop-blur-md sm:-mx-6 sm:px-6 md:flex-row md:items-center md:justify-between">
        <nav aria-label="Categories" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:pb-0">
          {[{ id: undefined, label: "All" }, ...CATEGORIES].map((c) => {
            const selected = c.id === category;
            return (
              <Link
                key={c.label}
                href={href(c.id, sort)}
                aria-current={selected ? "page" : undefined}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors",
                  selected ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground/50",
                )}
              >
                {c.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-1 text-sm">
          <span className="mr-2 text-muted-foreground">Sort</span>
          <div className="-mx-1 flex gap-1 overflow-x-auto px-1">
            {SORTS.map((s) => (
              <Link
                key={s.id}
                href={href(category, s.id)}
                aria-current={sort === s.id ? "true" : undefined}
                className={cn("shrink-0 rounded-full px-3 py-1.5 transition-colors", sort === s.id ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard key={p.slug} product={p} priority={i < 2} />
        ))}
      </div>
    </div>
  );
}
