import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Modo servidor para soportar API routes con NEON
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
