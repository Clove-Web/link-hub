/* info/src/app/page.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/* app/page.tsx */

import {
  page,
  header,
  brand,
  avatarWrap,
  avatarDisc,
  avatar,
  actions,
  btnPrimary,
  btnSecondary,
  footer,
} from "@styles/home.css";
import SiteGrid from "@app/SiteGrid";
import Tagline from "@app/Tagline";
import BrandName from "@app/BrandName";

// PocketID login; the signup page is on this site at /signup.
const pocketIdUrl = "https://doughmination.xyz";

// Edit me: add or change your sites here.
const sites = [
  {
    title: "Doughmination Gay",
    desc: "My personal website",
    href: "https://doughmination.gay",
  },
  {
    title: "Doughmination Blog",
    desc: "My personal blog",
    href: "https://blog.doughmination.gay",
  },
  {
    title: "Doughmination Music",
    desc: "My music app and collection",
    href: "https://doughmination.me",
  },
  {
    title: "Doughmination Mail",
    desc: "My private email service",
    href: "https://mail.doughmination.gay",
  },
  {
    title: "Doughmination System",
    desc: "System Tracker and Headmate Management",
    href: "https://doughmination.co.uk",
  },
  {
    title: "Doughmination API",
    desc: "Public API have made",
    href: "https://doughmination.uk",
  }
];

export default function Page() {
  return (
    <main className={page}>
      <div className={actions}>
        <a className={btnSecondary} href={pocketIdUrl}>Log in</a>
        <a className={btnPrimary} href="/signup">Sign up</a>
      </div>

      <header className={header}>
        <div className={brand}>
          <div className={avatarWrap}>
            <span className={avatarDisc} aria-hidden />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={avatar}
              src="https://m.doughmination.gay/img/avatars/favicon.png"
              alt="Clove's avatar"
              width={190}
              height={190}
            />
          </div>

          <BrandName />
        </div>

        <Tagline />
      </header>

      <SiteGrid sites={sites} />

      <footer className={footer}>
        © {new Date().getFullYear()} Doughmination System
      </footer>
    </main>
  );
}
