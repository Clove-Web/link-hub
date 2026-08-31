/* info/src/app/BrandName.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/* app/BrandName.tsx */

"use client";

import { useEffect, useState } from "react";

import { name, letter, nameInner } from "@styles/home.css";

// Edit me: the wordmark cycles through these. Add every subdomain you want shown.
const subdomains = [
  "clove",
  "doughmination",
  "genderfluid",
  "linux",
  "meow",
  "mrrp",
  "myst",
  "transbian",
];

const brands = subdomains.map((subdomain) => `${subdomain}.is-a.dev`);

// How long each name stays before swapping.
const holdMs = 3800;

export default function BrandName() {
  // SSR renders the first name, so there is no flash before hydration.
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (brands.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setIndex((current) => (current + 1) % brands.length);
    }, holdMs);

    return () => clearInterval(id);
  }, []);

  const current = brands[index];

  return (
    <h1 className={name} aria-label={current}>
      {/* Keyed so each swap remounts and replays the entrance animation. */}
      <span key={current} className={nameInner}>
        {[...current].map((character, position) => (
          <span
            key={position}
            className={letter}
            aria-hidden
            style={{ animationDelay: `${(position * 0.06).toFixed(2)}s` }}
          >
            {character === " " ? " " : character}
          </span>
        ))}
      </span>
    </h1>
  );
}
