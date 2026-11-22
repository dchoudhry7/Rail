import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the floating Next.js "N" dev badge (dev-only; never shown in production).
  devIndicators: false,
  // The rail uses garment photos as CSS masks (for shadows and shading). Masks need
  // same-origin or CORS-enabled images, and the CDN sends no CORS headers, so serve
  // the cut-outs through our own origin.
  async rewrites() {
    return [{ source: "/cdn/:path*", destination: "https://cdn.21st.dev/assets/mirror/:path*" }];
  },
  images: {
    // Let Unsplash resize and crop at each srcset width (see lib/image-loader.ts).
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.21st.dev" },
    ],
  },
};

export default nextConfig;
