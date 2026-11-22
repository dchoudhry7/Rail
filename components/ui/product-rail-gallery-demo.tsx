"use client";

import ClothingRailHero from "@/components/ui/product-rail-gallery";
import type { RailGarment } from "@/components/ui/product-rail-gallery";
import { PRODUCTS, toRailGarment } from "@/lib/products";

/** Same ten pieces as the original demo, sourced from the store catalogue. */
export const RAIL_DEMO_ITEMS: RailGarment[] = PRODUCTS.map(toRailGarment);

export default function ClothingRailHeroDemo({ autoplay = true }: { autoplay?: boolean }) {
  return (
    <div data-rail-demo className="flex min-h-svh w-full items-center justify-center bg-background text-foreground">
      <ClothingRailHero
        items={RAIL_DEMO_ITEMS}
        hanger="none"
        eyebrow="New season · Ten pieces on the rail"
        heading="A clothing rail you can handle, right on the page."
        caption="Brush along the rail, slide a hanger, lift a piece to see the back."
        autoplay={autoplay}
        action={
          <button type="button" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-sm outline-none transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none">
            Shop the edit
          </button>
        }
      />
    </div>
  );
}
