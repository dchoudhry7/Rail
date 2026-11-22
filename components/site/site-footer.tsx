import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { Newsletter } from "@/components/site/newsletter";
import { CATEGORIES } from "@/lib/products";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A small rail of everyday clothes, made in Porto from organic and natural fibres. We only make what fits on the rail.
          </p>
          <div className="mt-8">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Letters from the rail</p>
            <Newsletter compact />
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Shop</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/shop" className="hover:text-accent">Shop all</Link></li>
            {CATEGORIES.map((c) => (
              <li key={c.id}><Link href={`/shop?category=${c.id}`} className="hover:text-accent">{c.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Rail</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-accent">Our story</Link></li>
            <li><Link href="/bag" className="hover:text-accent">Your bag</Link></li>
            <li><Link href="/demo" className="hover:text-accent">Rail demo</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Rail Supply Co. A demo storefront.</p>
          <p>Photography via Unsplash.</p>
        </div>
      </div>
    </footer>
  );
}
