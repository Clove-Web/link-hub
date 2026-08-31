/* info/src/app/BrandName.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/* app/BrandName.tsx */

"use client";

import { useEffect, useState } from "react";

import {
  name,
  nameInner,
  nameGhost,
  nameTyped,
  letter,
  cursor,
} from "@styles/home.css";

// Edit me: the wordmark types through these. Add every subdomain you want shown.
const subdomains = [
  "clove",
  "doughmination",
  "genderfluid",
  "linux",
  "meow",
  "mrrp",
  "transbian",
];

// Only the label is typed; this part stays put.
const suffix = ".is-a.dev";

// Widest label, rendered invisibly so the suffix never moves while typing.
const longest = subdomains.reduce((a, b) => (b.length > a.length ? b : a), "");

const typeMs = 55;
const deleteMs = 35;
const holdMs = 2600;

// Which label the current hostname maps to; falls back to the first.
function hostIndex() {
  if (typeof window === "undefined") return 0;
  const label = window.location.hostname.split(".")[0];
  const found = subdomains.indexOf(label);
  return found === -1 ? 0 : found;
}

export default function BrandName() {
  // SSR and the first client render both show subdomains[0], so hydration matches.
  const [sub, setSub] = useState(subdomains[0]);
  const [label, setLabel] = useState(subdomains[0] + suffix);

  useEffect(() => {
    const start = hostIndex();

    // Land on the current subdomain, fully typed.
    setSub(subdomains[start]);
    setLabel(subdomains[start] + suffix);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Then cycle: hold, delete the label, type the next one, repeat.
    let line = start;
    let count = subdomains[start].length;
    let deleting = false;
    let alive = true;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (!alive) return;

      const full = subdomains[line];
      let delay = typeMs;

      if (!deleting && count < full.length) {
        count += 1;
      } else if (!deleting && count === full.length) {
        deleting = true;
        delay = holdMs;
        setLabel(full + suffix);
      } else if (deleting && count > 0) {
        count -= 1;
        delay = deleteMs;
      } else {
        deleting = false;
        line = (line + 1) % subdomains.length;
        count = 0;
      }

      setSub(subdomains[line].slice(0, count));
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, holdMs);

    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <h1 className={name} aria-label={label}>
      <span className={nameInner}>
        <span className={nameGhost} aria-hidden>
          {longest}
        </span>
        <span className={nameTyped} aria-hidden>
          {[...sub].map((character, position) => (
            <span
              key={position}
              className={letter}
              style={{ animationDelay: `${(position * 0.06).toFixed(2)}s` }}
            >
              {character}
            </span>
          ))}
          <span className={cursor}>▌</span>
        </span>
      </span>
      <span aria-hidden>{suffix}</span>
    </h1>
  );
}
