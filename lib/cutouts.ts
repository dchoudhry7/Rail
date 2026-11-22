/**
 * Garment cut-outs are 645×1000 WebP files proxied from the CDN at /cdn/<shard>/<hash>.webp.
 * app/img/[w]/[shard]/[file]/route.ts pre-renders smaller copies at build time, so pages can
 * serve a width that matches how large each photo is actually drawn.
 */
export const CUTOUT_WIDTHS = [320, 480] as const;
export type CutoutWidth = (typeof CUTOUT_WIDTHS)[number];
export const CUTOUT_NATIVE_WIDTH = 645;

const CUTOUT = /^\/cdn\/([0-9a-f]{2})\/([0-9a-f]{64}\.webp)$/;

export function parseCutout(src: string) {
  const m = CUTOUT.exec(src);
  return m ? { shard: m[1]!, file: m[2]! } : null;
}

/** URL of a resized copy, or the original src when it isn't a known cut-out. */
export function cutoutAt(src: string, width: CutoutWidth) {
  const c = parseCutout(src);
  return c ? `/img/${width}/${c.shard}/${c.file}` : src;
}

/** `srcset` covering the resized copies plus the original, or undefined for other images. */
export function cutoutSrcSet(src: string) {
  if (!parseCutout(src)) return undefined;
  return [...CUTOUT_WIDTHS.map((w) => `${cutoutAt(src, w)} ${w}w`), `${src} ${CUTOUT_NATIVE_WIDTH}w`].join(", ");
}
