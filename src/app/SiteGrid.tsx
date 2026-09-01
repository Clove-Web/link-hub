/* info/src/app/SiteGrid.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/* app/SiteGrid.tsx */

import { grid, card, cardTitle, cardArrow, cardDesc } from "@styles/home.css";

type Site = {
  title: string;
  desc: string;
  href: string;
};

export default function SiteGrid({ sites }: { sites: Site[] }) {
  return (
    <nav className={grid}>
      {sites.map((site) => (
        <a key={site.href + site.title} className={card} href={site.href}>
          <span className={cardTitle}>
            {site.title}
            <span className={cardArrow} aria-hidden>
              →
            </span>
          </span>
          <span className={cardDesc}>{site.desc}</span>
        </a>
      ))}
    </nav>
  );
}
