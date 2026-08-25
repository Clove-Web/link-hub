/* info/src/app/Tagline.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/* app/Tagline.tsx */

"use client";

import { useEffect, useState } from "react";

import { tagline, cursor } from "@styles/home.css";

const lines = [
  "A little map to everything I make and run.",
  "My home of unstable little stupidity.",
  "Basically a linktree with root access.",
  "Powered by caffeine and questionable commit messages.",
  "Home-rolled infra held together by duct tape and prayers.",
  "Fifty percent documentation, fifty percent pure hope.",
  "A monument to architecture that works on my machine.",
  "Where code goes to run until it segfaults.",
  "Too many containers, not enough monster.",
  "Somewhere between a homelab and a cry for help.",
  "Everything is automated. Nothing is under control.",
  "Held together by YAML and misplaced confidence.",
  "Built with love, maintained with git blame.",
  "A tasteful collection of servers and bad ideas.",
  "Self-hosted because apparently I enjoy suffering.",
  "Infrastructure, but make it mildly concerning.",
  "A suspicious amount of computing power for one person.",
  "If it has a domain, I probably host it somewhere.",
  "Just a normal person with an abnormal number of subdomains.",
  "A small corner of the internet I haven't broken yet.",
  "Because apparently one website wasn't enough.",
  "Things I made, things I maintain, and things that somehow still work.",
  "More ports than I have business opening.",
  "The infrastructure equivalent of a junk drawer.",
  "I have no idea what I'm doing, but the uptime is impressive.",
  "Fueled by caffeine, curiosity, and git push --force.",
  "This seemed like a good idea at 2 AM.",
  "A collection of projects, services, and technical debt.",
  "Built from source and questionable life choices.",
  "The README said it would be easy.",
  "It worked yesterday.",
  "Works on my server.",
  "There are probably logs for that.",
  "Please don't ask how the backend works.",
  "Deploy first. Read the documentation eventually.",
  "One more container can't hurt.",
  "If it breaks, it was probably DNS.",
  "If it isn't DNS, it's probably Docker.",
  "I put the fun in functional infrastructure.",
  "Making the internet worse, one service at a time.",
  "A link hub for projects that escaped the development environment.",
  "Home-rolled infra, artisanal technical debt.",
  "A little map to everything I make, break, and inevitably fix.",
  "Too many services, not enough common sense.",
  "Professionally overengineered. Personally underprepared.",
  "There is absolutely a reason for all these services.",
];

const typeMs = 45;
const deleteMs = 22;
const holdMs = 2200;

export default function Tagline() {
  // Start on the full first line so SSR shows the real tagline with no flash.
  const [text, setText] = useState(lines[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Create a randomized order without modifying the original lines array.
    const shuffled = [...lines].sort(() => Math.random() - 0.5);

    let line = 0;
    let count = shuffled[0].length;
    let deleting = false;
    let alive = true;
    let timer: ReturnType<typeof setTimeout>;

    // Start from the SSR-rendered first line, then transition into
    // the randomized sequence.
    setText(shuffled[0]);

    const tick = () => {
      if (!alive) return;

      const full = shuffled[line];
      let delay = typeMs;

      if (!deleting && count < full.length) {
        count += 1;
      } else if (!deleting && count === full.length) {
        deleting = true;
        delay = holdMs;
      } else if (deleting && count > 0) {
        count -= 1;
        delay = deleteMs;
      } else {
        deleting = false;
        line = (line + 1) % shuffled.length;
        count = 0;
      }

      setText(shuffled[line].slice(0, count));
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, typeMs);

    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <p className={tagline}>
      {text}
      <span className={cursor} aria-hidden>
        ▌
      </span>
    </p>
  );
}