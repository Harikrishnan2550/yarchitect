import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enables high-quality image optimization for local and remote images
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
    ],
  },
  // Ensures Framer Motion and other client components work smoothly with Turbopack
  transpilePackages: ['framer-motion'],
};

export default nextConfig;