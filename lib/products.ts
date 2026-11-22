import type { GarmentKind, RailGarment } from "@/components/ui/product-rail-gallery";

export type Category = "tees" | "shirts" | "knitwear" | "sweats";

export interface Product {
  slug: string;
  name: string;
  colorName: string;
  kind: GarmentKind;
  /** Swatch / illustration colour. */
  color: string;
  price: number;
  category: Category;
  description: string;
  details: string[];
  fabric: string;
  fit: string;
  care: string;
  sizes: string[];
  isNew?: boolean;
  images: { front: string; back: string; side: string };
}

/** Proxied to https://cdn.21st.dev/assets/mirror (see next.config.ts) so CSS masks work. */
const CDN = "/cdn";

export const CATEGORIES: { id: Category; label: string; blurb: string; image: string }[] = [
  { id: "tees", label: "Tees", blurb: "Heavyweight cotton, cut to last.", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b" },
  { id: "shirts", label: "Shirts", blurb: "Oxford cloth and soft collars.", image: "https://images.unsplash.com/photo-1603252109303-2751441dd157" },
  { id: "knitwear", label: "Knitwear", blurb: "Lambswool, slub and stripes.", image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2" },
  { id: "sweats", label: "Sweats", blurb: "400 gsm fleece, brushed inside.", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633" },
];

export const PRODUCTS: Product[] = [
  {
    slug: "heavyweight-tee-bone",
    name: "Heavyweight Tee",
    colorName: "Bone",
    kind: "tee",
    color: "#EFEBE2",
    price: 48,
    category: "tees",
    description: "Our everyday tee, made from 240 gsm organic cotton. It has a tonal embroidery on the chest and a collar that keeps its shape.",
    details: ["240 gsm", "Regular fit", "Tonal embroidery"],
    fabric: "100% organic cotton jersey, 240 gsm. Garment-dyed and pre-shrunk.",
    fit: "Regular fit, true to size. Model is 183 cm and wears M.",
    care: "Wash cold, inside out. Dry flat. Warm iron on reverse.",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: {
      front: `${CDN}/14/1485bf44725b18fcdba71bfae54d67d648ab3bff4b24215a042c0cc4c895a2e6.webp`,
      back: `${CDN}/69/69937e656430ae33d950303e0d53051273e5b02189750ef1e7429ec4bbf95e20.webp`,
      side: `${CDN}/83/838468c32f16b4acba62e4601276737411156052444712ff2534fefe994a7bed.webp`,
    },
  },
  {
    slug: "graphic-tee-ink",
    name: "Graphic Tee",
    colorName: "Ink",
    kind: "tee",
    color: "#101214",
    price: 52,
    category: "tees",
    description: "A black heavyweight tee with a wordmark screen-printed on the front and back. Water-based inks, so the print softens with every wash.",
    details: ["240 gsm", "Regular fit", "Screen print"],
    fabric: "100% organic cotton jersey, 240 gsm. Water-based screen print.",
    fit: "Regular fit, true to size.",
    care: "Wash cold, inside out. Do not iron print.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    isNew: true,
    images: {
      front: `${CDN}/d7/d769f183472d0fd98a7aff2a643593748cd36ef9da1497d9bf6f0d87d1025a9b.webp`,
      back: `${CDN}/fe/fec6f7e96b198cc5b9aad333ca2c4c10968a746d87f6dc11d9c118607b509058.webp`,
      side: `${CDN}/b3/b3b6984ea94b8b8cd19fb15387e89dca457ac0f947115c2a54a33217e4fb4571.webp`,
    },
  },
  {
    slug: "oxford-shirt-sky",
    name: "Oxford Shirt",
    colorName: "Sky",
    kind: "shirt",
    color: "#A3D3EB",
    price: 74,
    category: "shirts",
    description: "A pale blue oxford with a button-down collar, a chest pocket and a small embroidery. Wear it buttoned, or open over a tee.",
    details: ["Oxford cotton", "Button-down collar", "Chest pocket"],
    fabric: "100% cotton oxford cloth, 140 gsm. Corozo buttons.",
    fit: "Relaxed through the body with a curved hem.",
    care: "Machine wash 30°. Hang to dry. Iron while damp.",
    sizes: ["S", "M", "L", "XL"],
    images: {
      front: `${CDN}/47/470a7723cef068f81e8a4c09d1ab3f8630c61b734c2168b10f3858e45efbf31f.webp`,
      back: `${CDN}/9b/9be14e5dce879756775677e2d82dadc2ad9a1690b7df2f82de360cb3600d0ee5.webp`,
      side: `${CDN}/59/5984d5ca60fd1aeee7e688ec33c2219a1c537fcde90d2accab813c13985f8632.webp`,
    },
  },
  {
    slug: "knit-cardigan-olive",
    name: "Knit Cardigan",
    colorName: "Olive",
    kind: "knit",
    color: "#758151",
    price: 96,
    category: "knitwear",
    description: "A chunky olive cardigan in lambswool, with wooden buttons and ribbed trims. Warm enough to wear instead of a jacket on mild days.",
    details: ["Lambswool", "Wooden buttons", "V-neck"],
    fabric: "100% lambswool, 5 gauge. Olive-wood buttons.",
    fit: "Slightly boxy. Size down for a closer fit.",
    care: "Hand wash cold or dry clean. Dry flat.",
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    images: {
      front: `${CDN}/58/581b13c5ca241c653dc94d2c8048c92a60f022cfbaaf153261076d3a6655827e.webp`,
      back: `${CDN}/d9/d9178d906d37268565cf10af3431aee543aacfc73610f7fa7b0fa4758c498cb3.webp`,
      side: `${CDN}/de/dee1c529600e0460413f1a9b07a29bedb7ea7dc96181fce5d9d6501231e6e45d.webp`,
    },
  },
  {
    slug: "hoodie-heather",
    name: "Fleece Hoodie",
    colorName: "Heather",
    kind: "hoodie",
    color: "#A0A5AB",
    price: 88,
    category: "sweats",
    description: "A heather-grey hoodie in brushed 400 gsm fleece, with a wordmark across the chest. It has a double-layer hood and a kangaroo pocket.",
    details: ["400 gsm fleece", "Kangaroo pocket", "Chest print"],
    fabric: "80% organic cotton, 20% recycled polyester. Brushed back fleece.",
    fit: "Relaxed fit with dropped shoulders.",
    care: "Wash cold, inside out. Tumble dry low.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: {
      front: `${CDN}/51/51750ba098dd622df46695bca781b3f0ec336a36b93b070e638cc04455def6d6.webp`,
      back: `${CDN}/e7/e75c4ac8fb7f14caae756338a31f81f1437bb312b78e0d7d906e9f956e7968fa.webp`,
      side: `${CDN}/a2/a2eb2463d52146c341ede6bb9f6067e917a23eb29b7b1d1d4c40ac084a01c7ce.webp`,
    },
  },
  {
    slug: "crewneck-lilac",
    name: "Crewneck Sweatshirt",
    colorName: "Lilac",
    kind: "knit",
    color: "#CCB2E0",
    price: 78,
    category: "sweats",
    description: "A muted lilac crewneck in fleece, with a raised puff print. The ribbed cuffs and hem hold their shape after many washes.",
    details: ["400 gsm fleece", "Ribbed trims", "Puff print"],
    fabric: "80% organic cotton, 20% recycled polyester. Puff print.",
    fit: "Regular fit, true to size.",
    care: "Wash cold, inside out. Do not iron print.",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: {
      front: `${CDN}/8e/8e38660e2add9637c27846d9b8d620f2abb228a5a153ccfd7b1c808b6845e1f8.webp`,
      back: `${CDN}/b9/b9214a6e009ce4b3044595a51ea010c299135bab5b26775c43d7175c86e77898.webp`,
      side: `${CDN}/59/591872e42b483c43c1cd08a3ac4d7d40c0b5fa2bc585a36096faded2e696e84e.webp`,
    },
  },
  {
    slug: "pique-polo-forest",
    name: "Piqué Polo",
    colorName: "Forest",
    kind: "tee",
    color: "#185B37",
    price: 62,
    category: "tees",
    description: "A forest-green polo in piqué knit, with a bone embroidery on the chest. It has a two-button placket and a flat-knit collar.",
    details: ["Piqué knit", "Two-button placket", "Embroidered"],
    fabric: "100% cotton piqué, 220 gsm.",
    fit: "Regular fit with side vents.",
    care: "Machine wash 30°. Dry flat.",
    sizes: ["S", "M", "L", "XL"],
    images: {
      front: `${CDN}/19/19fe43cb681195ae227e3164088d86a07a1b6e33cc54c6e35637374736a16894.webp`,
      back: `${CDN}/e0/e095182b1a7f04e600c5662aa871b4c055c294b152586817d84e312c22f744cf.webp`,
      side: `${CDN}/00/005a8e10be234bc40917f3153208b8196ba1610c53c987e39942da1f4a7cd808.webp`,
    },
  },
  {
    slug: "henley-brick",
    name: "Long-Sleeve Henley",
    colorName: "Brick",
    kind: "knit",
    color: "#B05139",
    price: 56,
    category: "knitwear",
    description: "A dusty brick henley in slub cotton, with a three-button placket. It's washed before it ships, so it feels worn in from the first day.",
    details: ["Slub cotton", "Three buttons", "Long sleeve"],
    fabric: "100% slub cotton jersey, 200 gsm. Enzyme washed.",
    fit: "Slim through the body.",
    care: "Machine wash 30°. Tumble dry low.",
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    images: {
      front: `${CDN}/84/84aa4b0e21ed11fcbc083647a607b94ee3a6c21cb66c114cfb1dad0792c15499.webp`,
      back: `${CDN}/01/01c299df56a29afca8dad4a64858bd506667338bfbd0435118e6c3698c7881b3.webp`,
      side: `${CDN}/9c/9ca38eeb156aae7d199d3c1ffb7947e395f77d1f094eea006c1b5fbb22352b4e.webp`,
    },
  },
  {
    slug: "breton-long-sleeve",
    name: "Breton Long Sleeve",
    colorName: "Ink / Bone",
    kind: "knit",
    color: "#E4DFD3",
    price: 58,
    category: "knitwear",
    description: "A classic Breton with ink stripes on bone, cut with a boat neck. It's one of the easiest pieces to wear with anything else here.",
    details: ["220 gsm", "Boat neck", "Long sleeve"],
    fabric: "100% cotton interlock, 220 gsm. Yarn-dyed stripe.",
    fit: "Regular fit, slightly cropped.",
    care: "Machine wash 30°. Dry flat.",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: {
      front: `${CDN}/09/096002a95aba7de9c197de4cb5c78cbbe17c1677b19c547cc20c6dbef47a899c.webp`,
      back: `${CDN}/74/74408a7dbb4f4fc6761ebb8d6ed93187248cddf75e1c2e70d38d04dfdd328776.webp`,
      side: `${CDN}/ed/eda3afca537071a80d7d82b3f0d1055b56f1f3263c20772224bae6660bf4072c.webp`,
    },
  },
  {
    slug: "oversized-tee-ochre",
    name: "Oversized Tee",
    colorName: "Ochre",
    kind: "tee",
    color: "#DE9C31",
    price: 52,
    category: "tees",
    description: "A boxy ochre tee with dropped shoulders, a small chest mark and a large print on the back.",
    details: ["Oversized", "Dropped shoulder", "Back print"],
    fabric: "100% organic cotton jersey, 260 gsm.",
    fit: "Oversized. Size down for a regular fit.",
    care: "Wash cold, inside out. Do not iron print.",
    sizes: ["S", "M", "L", "XL"],
    images: {
      front: `${CDN}/72/7208c811f54e123dd7b1a5c1c3926f43ca832f6c4c20c45de10671ffd544409d.webp`,
      back: `${CDN}/d3/d356989b7bc741c5cfc934cac34983dfb24d5d6a6b6e7b8b7f6b27cd3eceae69.webp`,
      side: `${CDN}/bf/bf94beeafb21f9cb21aa45057a67dc8a2e23ba95c7ac0f79dd27ba3ce4a1230c.webp`,
    },
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export function toRailGarment(p: Product): RailGarment {
  return {
    id: p.slug,
    name: `${p.name} · ${p.colorName}`,
    kind: p.kind,
    color: p.color,
    tag: formatPrice(p.price),
    description: p.description,
    details: p.details,
    image: p.images.front,
    backImage: p.images.back,
    sideImage: p.images.side,
  };
}

export const FREE_SHIPPING_THRESHOLD = 100;

/**
 * Unsplash editorial photography. Every photo here was checked at 1:1 for sharpness and is
 * at least 4K-class at source (≥ 8.3 MP, long edge ≥ 3840 px), so Unsplash never upscales it.
 */
export const EDITORIAL = {
  railRoom: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04", // 7360×4912
  greenHangers: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b", // 7952×5304
  chambrayHanger: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c", // 3064×4592
  camelCoat: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8", // 3933×5900
  denimHangers: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0", // 6720×4480
  inkFlatlay: "https://images.unsplash.com/photo-1544441893-675973e31985", // 5472×3648
  knitFlatlay: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2", // 6000×4000
  knitRail: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e", // 4032×3024
  shirtRow: "https://images.unsplash.com/photo-1561052967-61fc91e48d79", // 5863×3909
};
