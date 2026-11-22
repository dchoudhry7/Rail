import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EDITORIAL } from "@/lib/products";

export const metadata: Metadata = { title: "Our story" };

const CHAPTERS = [
  {
    n: "01",
    title: "One rail, not a warehouse",
    body: "Rail started as a single clothes rail in a Porto studio. Friends came round, flicked through the hangers and took things home. We built the site to feel the same way: you can brush the rail, push hangers aside and turn a piece round to see the back.",
    image: EDITORIAL.knitRail,
    alt: "Neutral knits and blouses on a single rail beside dried pampas grass",
  },
  {
    n: "02",
    title: "Made a few at a time",
    body: "Every piece is cut and sewn by a family workshop twenty minutes from our studio. We make small runs and remake them when they sell out. That means fewer markdowns, less waste, and clothes we can stand behind.",
    image: EDITORIAL.knitFlatlay,
    alt: "Knitwear, denim and a knit hat laid flat",
  },
  {
    n: "03",
    title: "Fibres that age well",
    body: "We use organic cotton jersey, lambswool, slub cotton and brushed fleece. They're heavier than usual so the fit holds up, and they're garment-dyed so they soften the way old favourites do.",
    image: EDITORIAL.inkFlatlay,
    alt: "A black tee, trousers and white trainers laid flat",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Our story</p>
        <h1 className="max-w-4xl font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.92] tracking-[-0.02em]">
          A shop you can <em className="text-accent">run your hand along.</em>
        </h1>
        <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-2xl bg-muted sm:aspect-[21/9]">
          <Image src={`${EDITORIAL.shirtRow}?fit=crop`} alt="A row of shirts hanging close together on a rail" fill preload fetchPriority="high" sizes="(min-width: 1280px) 1232px, 100vw" className="object-cover" />
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl space-y-24 px-4 sm:px-6">
        {CHAPTERS.map((c, i) => (
          <article key={c.n} className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div className={i % 2 ? "md:order-2" : undefined}>
              <p className="font-mono text-sm text-accent">{c.n}</p>
              <h2 className="mt-3 font-display text-4xl leading-tight tracking-tight sm:text-5xl">{c.title}</h2>
              <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
              <Image src={`${c.image}?fit=crop&ar=4:3`} alt={c.alt} fill sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-24 max-w-3xl px-4 text-center sm:px-6">
        <blockquote className="font-display text-4xl italic leading-tight sm:text-5xl">
          &ldquo;If it doesn&apos;t earn its place on the rail, we don&apos;t make it.&rdquo;
        </blockquote>
        <p className="mt-6 text-sm text-muted-foreground">The Rail studio, Porto</p>
        <Link href="/shop" className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background">
          See what&apos;s on the rail <ArrowRight className="size-4" />
        </Link>
      </section>
    </>
  );
}
