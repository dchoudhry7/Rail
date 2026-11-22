import type { Metadata } from "next";
import ClothingRailHeroDemo from "@/components/ui/product-rail-gallery-demo";

export const metadata: Metadata = { title: "Rail demo" };

export default function DemoPage() {
  return <ClothingRailHeroDemo />;
}
