/* info/src/app/SiteGrid.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/* app/SiteGrid.tsx */

"use client";

import { CSSProperties, MouseEvent, useRef, useState } from "react";

import {
  grid,
  card,
  cardTitle,
  cardArrow,
  cardDesc,
} from "@styles/home.css";

type Site = {
  title: string;
  desc: string;
  href: string;
};

const flyDistance = 1.9;

const staggerMs = 45;

const flightMs = 750;

// Hover tilt magnitude in degrees.
const tiltDeg = 6;

export default function SiteGrid({ sites }: { sites: Site[] }) {
  const gridRef = useRef<HTMLElement>(null);
  const [busy, setBusy] = useState(false);

  function explode(event: MouseEvent<HTMLAnchorElement>, href: string) {
    // Let modifier-clicks open normally.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    if (busy) return;

    const gridEl = gridRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!gridEl || reduced) {
      window.location.assign(href);
      return;
    }

    setBusy(true);
    const cardEls = Array.from(gridEl.querySelectorAll<HTMLElement>("[data-card]"));
    const gridRect = gridEl.getBoundingClientRect();
    const centerX = gridRect.left + gridRect.width / 2;
    const centerY = gridRect.top + gridRect.height / 2;
    let lastEnd = 0;

    cardEls.forEach((cardEl, index) => {
      const rect = cardEl.getBoundingClientRect();
      const offsetX = rect.left + rect.width / 2 - centerX;
      const offsetY = rect.top + rect.height / 2 - centerY;
      const flyX = offsetX * flyDistance + (Math.random() * 50 - 25);
      const flyY = offsetY * flyDistance - 40 + (Math.random() * 50 - 25);
      const spin = Math.random() * 70 - 35;
      const delay = index * staggerMs;

      // Cancel the entrance animation so its fill cannot override the transform.
      cardEl.style.animation = "none";
      cardEl.style.transition = `transform ${flightMs}ms cubic-bezier(.34,1.1,.4,1), opacity ${flightMs * 0.8}ms ease`;
      cardEl.style.transitionDelay = `${delay}ms`;
      cardEl.style.transform = `translate(${flyX}px, ${flyY}px) rotate(${spin}deg) scale(0.12)`;
      cardEl.style.opacity = "0";
      cardEl.style.pointerEvents = "none";
      lastEnd = Math.max(lastEnd, delay + flightMs);
    });

    window.setTimeout(() => {
      window.location.assign(href);
    }, Math.min(lastEnd + 60, 1300));
  }

  return (
    <nav className={grid} ref={gridRef}>
      {sites.map((site, index) => (
        <a
          key={site.href + site.title}
          data-card
          className={card}
          href={site.href}
          onClick={(event) => explode(event, site.href)}
          style={
            {
              "--tilt": index % 2 === 0 ? `-${tiltDeg}deg` : `${tiltDeg}deg`,
              animationDelay: `${(0.15 + index * 0.08).toFixed(2)}s`,
            } as CSSProperties
          }
        >
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
