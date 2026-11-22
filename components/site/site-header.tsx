"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, ShoppingBag } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/products";

const NAV = [
  { href: "/shop", label: "Shop all" },
  { href: "/shop?category=tees", label: "Tees" },
  { href: "/shop?category=knitwear", label: "Knitwear" },
  { href: "/shop?category=sweats", label: "Sweats" },
  { href: "/about", label: "About" },
];

type Variant = "desktop" | "mobile";

function NavList({ variant, isActive = () => false }: { variant: Variant; isActive?: (href: string) => boolean }) {
  if (variant === "mobile") {
    return (
      <ul className="flex flex-col gap-1">
        {NAV.map((item) => (
          <li key={item.href}>
            <SheetClose asChild>
              <Link href={item.href} className={cn("block py-2 font-display text-4xl tracking-tight", isActive(item.href) && "text-accent")}>
                {item.label}
              </Link>
            </SheetClose>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="hidden items-center gap-6 md:flex">
      {NAV.slice(0, 4).map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
            className={cn(
              "relative py-1 text-sm text-muted-foreground transition-colors hover:text-foreground",
              isActive(item.href) && "text-foreground after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-foreground",
            )}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ActiveNavList({ variant }: { variant: Variant }) {
  const pathname = usePathname();
  const params = useSearchParams();
  const category = params.get("category");
  const current = category ? `${pathname}?category=${category}` : pathname;
  return <NavList variant={variant} isActive={(href) => current === href} />;
}

function Nav({ variant }: { variant: Variant }) {
  return (
    <React.Suspense fallback={<NavList variant={variant} />}>
      <ActiveNavList variant={variant} />
    </React.Suspense>
  );
}

export function SiteHeader() {
  const { count, setOpen } = useCart();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-foreground px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-background">
        Free shipping over ${FREE_SHIPPING_THRESHOLD}
        <span className="hidden sm:inline">
          <span className="mx-2 opacity-40">/</span> 30-day returns
        </span>
      </div>
      {/* Frosted on desktop; near-opaque without the blur on phones, where repainting a
          backdrop blur on every scroll frame is a common source of jank. */}
      <div className="border-b border-border/70 bg-background/95 md:bg-background/85 md:backdrop-blur-md">
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6">
          <nav aria-label="Main" className="flex items-center gap-1">
            <Sheet>
              <SheetTrigger className="-ml-2 inline-flex size-10 items-center justify-center rounded-full hover:bg-muted md:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[82vw] max-w-sm bg-background px-6 pt-14">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <Nav variant="mobile" />
                <p className="mt-auto pb-8 text-sm text-muted-foreground">Ten pieces, hung properly.</p>
              </SheetContent>
            </Sheet>
            <Nav variant="desktop" />
          </nav>

          <Logo />

          <div className="flex items-center justify-end gap-5">
            <Link
              href="/about"
              className={cn("hidden text-sm text-muted-foreground transition-colors hover:text-foreground md:inline", pathname === "/about" && "text-foreground")}
            >
              About
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="relative -mr-2 inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-muted"
              aria-label={`Open bag, ${count} ${count === 1 ? "item" : "items"}`}
            >
              <ShoppingBag className="size-[22px]" strokeWidth={1.6} />
              {count > 0 && (
                <span
                  key={count}
                  aria-hidden
                  className="absolute right-0.5 top-0.5 inline-flex h-[18px] min-w-[18px] animate-in zoom-in-50 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold leading-none tabular-nums text-accent-foreground ring-2 ring-background duration-300"
                >
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
