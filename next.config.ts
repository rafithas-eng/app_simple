import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add any other custom configuration options here
  pageExtensions: ["tsx", "ts", "jsx", "js"],
};


export default nextConfig;
