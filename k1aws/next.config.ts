import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.1.195'],
  images: {
    qualities: [100],
  },
  output: "standalone",

};

export default nextConfig;
