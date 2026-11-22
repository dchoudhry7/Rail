"use client";

import type { ImageLoaderProps } from "next/image";

/**
 * next/image loader for Unsplash. Unsplash (imgix) does the resizing and cropping, so each
 * srcset width is a real image at that size, compressed once. Crop hints such as
 * `fit=crop&ar=4:5` in the src are kept, so the photo arrives at the frame's aspect ratio
 * instead of being cropped and stretched by CSS.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (!src.startsWith("https://images.unsplash.com/")) return src;
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  // 85 keeps fabric texture crisp on HD/4K screens; Unsplash serves AVIF/WebP via auto=format.
  url.searchParams.set("q", String(quality ?? 85));
  if (!url.searchParams.has("auto")) url.searchParams.set("auto", "format");
  return url.toString();
}
