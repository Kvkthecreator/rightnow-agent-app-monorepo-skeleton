import type { NextConfig } from "next";

const nextConfig = {
  // any existing Next.js options, e.g. rewrites()
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ]
  },
}

export default nextConfig
