import type { NextConfig } from "next";

const config: NextConfig = {
  turbopack: { root: process.cwd() },
  outputFileTracingRoot: process.cwd(),
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.1.11"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.21st.dev" },
      { protocol: "https", hostname: "me7aitdbxq.ufs.sh" },
    ],
  },
};
export default config;
