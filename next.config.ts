import type { NextConfig } from "next";

// NEXT_PUBLIC_BASE_PATH is set in the GitHub Actions workflow.
// For a repo at github.com/user/haptic-atlas the value should be "/haptic-atlas".
// Leave empty if deploying to a root domain (user.github.io).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
