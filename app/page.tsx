import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, MoveRight, RotateCcw, Ruler, Truck } from "lucide-react";
import { ShopRail } from "@/components/site/shop-rail";
import { ProductCard } from "@/components/site/product-card";
import { Newsletter } from "@/components/site/newsletter";
import { CATEGORIES, EDITORIAL, PRODUCTS } from "@/lib/products";

const MARQUEE = ["Organic cotton", "Made in Porto", "Free shipping over $100", "30-day returns", "Garment-dyed", "Ten pieces, no seasons"];

const VALUES = [
  { icon: Leaf, title: "Natural fibres", body: "Organic cotton, lambswool and recycled fleece. No virgin synthetics." },
  { icon: Ruler, title: "Cut to keep", body: "Heavier fabrics and pre-shrunk jersey, so the fit stays the same." },
  { icon: Truck, title: "Shipped plastic-free", body: "Paper mailers and cotton ties. Free over $100." },
  { icon: RotateCcw, title: "30-day returns", body: "Wrong size? We'll swap it or refund you. No questions asked." },
];

// `sizes` is the width each photo is drawn at with object-cover, which for a landscape photo
// in a tall tile is height × 1.5, not the tile width. Getting it right keeps HD/4K screens sharp.
const LOOKS = [
  { src: EDITORIAL.greenHangers, alt: "Green tees hanging on wooden hangers", caption: "Same tee, every colour", href: "/shop?category=tees", className: "md:col-span-2 md:row-span-2", sizes: "(min-width: 768px) 820px, 90vw" },
  { src: EDITORIAL.camelCoat, alt: "Man in a camel coat sitting on a stool", caption: "Layer it up", href: "/shop?category=knitwear", className: "", sizes: "(min-width: 1280px) 320px, (min-width: 768px) 25vw, 50vw" },
  { src: EDITORIAL.chambrayHanger, alt: "A chambray shirt on a hanger against a grey wall", caption: "Shirts, hung right", href: "/shop?category=shirts", className: "", sizes: "(min-width: 1280px) 320px, (min-width: 768px) 25vw, 50vw" },
  { src: EDITORIAL.denimHangers, alt: "Jeans hanging from wooden hangers on a rail", caption: "Wooden hangers, always", href: "/about", className: "md:col-span-2", sizes: "(min-width: 1280px) 640px, (min-width: 768px) 50vw, 90vw" },
];

export default function HomePage() {
  const newIn = [...PRODUCTS.filter((p) => p.isNew), ...PRODUCTS.filter((p) => !p.isNew)].slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 pt-12 sm:px-6 md:pt-16 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Everyday clothes · Made in Porto</p>
            <h1 className="font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.9] tracking-[-0.02em]">
              Clothes, hung <em className="text-accent">properly.</em>
            </h1>
          </div>
          <div className="max-w-md lg:justify-self-end lg:pb-3">
            <p className="text-base leading-relaxed text-muted-foreground">
              Brush along the rail, push a hanger aside, and lift a piece off to see the back. It&apos;s how we&apos;d show you round the shop.
            </p>
            <Link href="/shop" className="mt-5 inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline">
              Or browse as a grid <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <ShopRail
          products={PRODUCTS}
          autoplay
          aria-label="The full rail"
          caption="Brush along the rail, slide a hanger, lift a piece to see the back."
          className="mt-4 !bg-transparent"
          action={
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-sm transition hover:-translate-y-px hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Shop the edit <ArrowRight className="size-4" />
            </Link>
          }
        />
      </section>

      {/* Marquee */}
      <div className="marquee-strip overflow-hidden border-y border-border bg-secondary/50 py-4" aria-hidden="true">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap font-display text-2xl italic text-foreground/80">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="flex items-center gap-12">
              {m}
              <span className="inline-block size-1.5 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl tracking-tight sm:text-5xl">Shop by shelf</h2>
          <Link href="/shop" className="hidden items-center gap-2 text-sm text-muted-foreground hover:text-foreground sm:inline-flex">
            Everything <MoveRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link key={c.id} href={`/shop?category=${c.id}`} className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
              <Image
                src={`${c.image}?fit=crop&ar=3:4`}
                alt=""
                fill
                sizes="(min-width: 1280px) 300px, (min-width: 1024px) 25vw, 50vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                <p className="font-display text-3xl sm:text-4xl">{c.label}</p>
                <p className="mt-1 text-xs text-white/80 sm:text-sm">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New in */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Just hung</p>
            <h2 className="font-display text-4xl tracking-tight sm:text-5xl">New on the rail</h2>
          </div>
          <Link href="/shop?sort=new" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            See all <MoveRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {newIn.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Story split */}
      <section className="mx-auto mt-24 grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
          <Image src={`${EDITORIAL.railRoom}?fit=crop&ar=4:5`} alt="A single clothes rail hung from ropes in a bright shop" fill sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Why a rail</p>
          <h2 className="font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl">
            We only make what fits on <em>one rail.</em>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            No seasons and no endless scrolling. We keep ten pieces and remake them in small runs at a family workshop in Porto. When something sells out, we make more. When something isn&apos;t good enough, it comes off the rail.
          </p>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
            {[
              ["10", "pieces"],
              ["1", "workshop"],
              ["0", "deadstock"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-5xl">{n}</dd>
                <dd className="mt-1 text-sm text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
          <Link href="/about" className="mt-10 inline-flex items-center gap-2 rounded-full border border-foreground px-5 py-2.5 text-sm font-medium transition hover:bg-foreground hover:text-background">
            Read our story <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ icon: Icon, title, body }) => (
            <li key={title} className="bg-background p-6 sm:p-8">
              <Icon className="size-5 text-accent" aria-hidden />
              <h3 className="mt-5 text-base font-medium">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Lookbook */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <div className="mb-8">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Lookbook</p>
          <h2 className="font-display text-4xl tracking-tight sm:text-5xl">Worn, not styled</h2>
        </div>
        <div className="grid auto-rows-[220px] grid-cols-2 gap-3 sm:gap-4 md:auto-rows-[260px] md:grid-cols-4">
          {LOOKS.map((look) => (
            <Link key={look.src} href={look.href} className={`group relative overflow-hidden rounded-xl bg-muted ${look.className}`}>
              <Image src={`${look.src}?fit=crop`} alt={look.alt} fill sizes={look.sizes} className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]" />
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium backdrop-blur transition group-hover:bg-foreground group-hover:text-background">
                {look.caption} <ArrowRight className="size-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-16 text-background sm:px-12 md:py-20">
          <div className="relative z-10 grid gap-8 md:grid-cols-2 md:items-end">
            <h2 className="font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl">
              Hear when something new is <em className="text-accent">hung.</em>
            </h2>
            <div className="[&_form]:border-background/30 [&_form:focus-within]:border-background [&_input]:text-background [&_input::placeholder]:text-background/50 [&_button:hover]:bg-background [&_button:hover]:text-foreground">
              <p className="mb-4 text-sm text-background/70">One short letter a month. New pieces, restocks and the occasional sample sale.</p>
              <Newsletter />
            </div>
          </div>
          <svg aria-hidden viewBox="0 0 400 120" className="absolute -right-10 -top-6 w-[520px] text-background/[0.06]">
            <path d="M0 20h400" stroke="currentColor" strokeWidth="6" />
            {[40, 110, 180, 250, 320].map((x) => (
              <path key={x} d={`M${x} 20v14l-30 28h60l-30-28`} fill="none" stroke="currentColor" strokeWidth="4" />
            ))}
          </svg>
        </div>
      </section>
    </>
  );
}
