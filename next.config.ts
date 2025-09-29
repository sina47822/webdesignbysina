import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  // eslint: {
  //   // Ignore specific ESLint rules
  //   ignoreDuringBuilds: true, // Optionally ignore all ESLint errors during builds
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**', // optional: فقط مسیر media/blog/covers یا همه media
      },
      {
        protocol: 'https',
        hostname: 'webdesignwithsina.ir',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
