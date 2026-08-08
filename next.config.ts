/* info/next.config.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
import type { NextConfig } from "next";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: {
    mode: "auto",
  },
});

// "export" emits a fully static site to out/ — what Cloudflare Pages serves.
// (Previously "standalone", which built a Node server for the Dockerfile.)
const nextConfig: NextConfig = {
  output: "export",
};

export default withVanillaExtract(nextConfig);