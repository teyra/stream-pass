import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mammoth-plum-sheep.myfilebase.com",
        pathname: "/ipfs/**",
      },
      {
        protocol: "https",
        hostname: "gateway.lighthouse.storage",
        pathname: "/ipfs/**",
      },
    ],
  },
};

export default nextConfig;
