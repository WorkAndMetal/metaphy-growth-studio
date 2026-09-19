import type { NextConfig } from "next";

const config: NextConfig = {
  turbopack: { root: process.cwd() },
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.21st.dev" },
      { protocol: "https", hostname: "me7aitdbxq.ufs.sh" },
    ],
  },
};
export default config;
