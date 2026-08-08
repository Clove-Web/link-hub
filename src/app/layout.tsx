/* info/src/app/layout.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/* app/layout.tsx */

import type { Metadata, Viewport } from "next";
import SoundFX from "./SoundFX";
import "@styles/global.css";

const DESCRIPTION = "A little map to everything I make.";

const AVATAR = "https://m.doughmination.gay/img/avatars/favicon.png";

const SITE_URL = "https://doughmination.info";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Clove",
  description: DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      {
        url: AVATAR,
        type: "image/png",
      },
    ],
  },
  openGraph: {
    type: "website",
    siteName: "doughmination.info",
    title: "Clove",
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_GB",
    images: [
      {
        url: AVATAR,
        alt: "Clove Twilight logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    site: "@DoughminCEO",
    creator: "@DoughminCEO",
    title: "Clove",
    description: DESCRIPTION,
    images: [AVATAR],
  },
};

export const viewport: Viewport = {
  themeColor: "#f5a9b8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://m.doughmination.gay"
          crossOrigin=""
        />
      </head>
      <body>
        {children}
        <SoundFX />
      </body>
    </html>
  );
}
