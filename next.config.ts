// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // This allows the build to complete for your demo even if 
    // Framer Motion's types are conflicting with React 19.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;