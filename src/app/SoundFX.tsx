/* info/src/app/SoundFX.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

"use client";

import { useEffect } from "react";

const SFX_BASE = "https://m.doughmination.gay/sfx/";

const NAMES = ["hover", "click", "toggle"] as const;

const INTERACTIVE = 'a,button,[role="button"],summary,input[type="submit"]';

const TOGGLEABLE = 'input[type="checkbox"],input[type="radio"],[role="switch"]';

// UI sounds: hover, click, toggle. On by default, muteable (persisted),
// silenced under prefers-reduced-motion. Audio comes from the shared CDN.
export default function SoundFX() {
  useEffect(() => {
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const readMuted = (): boolean => {
      if (reduce) return true;
      try {
        return localStorage.getItem("sfx-muted") === "1";
      } catch {
        return false;
      }
    };

    let muted = readMuted();

    const sounds: Record<string, HTMLAudioElement> = {};
    for (const name of NAMES) {
      const audio = new Audio(`${SFX_BASE}${name}.mp3`);
      audio.preload = "auto";
      audio.volume = 0.3;
      sounds[name] = audio;
    }

    let lastHover = 0;

    const play = (name: string) => {
      if (muted) return;
      const audio = sounds[name];
      if (!audio) return;
      try {
        audio.currentTime = 0;
        const attempt = audio.play();
        if (attempt && typeof attempt.then === "function") {
          attempt.catch(() => {});
        }
      } catch {
        // Ignore autoplay / decode errors.
      }
    };

    const onOver = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.closest?.(".sfx-toggle")) return;
      if (!target.closest?.(INTERACTIVE)) return;
      const now = Date.now();
      if (now - lastHover < 90) return;
      lastHover = now;
      play("hover");
    };

    const onClick = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.closest?.(".sfx-toggle")) return;
      if (target.closest?.(TOGGLEABLE)) {
        play("toggle");
        return;
      }
      if (target.closest?.(INTERACTIVE)) play("click");
    };

    const onChange = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.matches?.(`${TOGGLEABLE},select`)) play("toggle");
    };

    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("click", onClick, true);
    document.addEventListener("change", onChange, true);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "sfx-toggle";
    button.style.cssText =
      "position:fixed;bottom:1rem;right:1rem;z-index:50;width:2.4rem;height:2.4rem;border-radius:999px;border:1px solid rgba(255,255,255,0.2);background:rgba(18,20,28,0.85);color:#f4f6fb;cursor:pointer;font-size:1.1rem;line-height:1";

    const glyph = () => (muted ? "\u{1F507}" : "\u{1F50A}");
    const label = () =>
      muted ? "Unmute interface sounds" : "Mute interface sounds";

    button.textContent = glyph();
    button.setAttribute("aria-label", label());

    const onToggle = () => {
      muted = !muted;
      try {
        localStorage.setItem("sfx-muted", muted ? "1" : "0");
      } catch {
        // localStorage may be unavailable; state still applies for the session.
      }
      button.textContent = glyph();
      button.setAttribute("aria-label", label());
      if (!muted) play("toggle");
    };

    button.addEventListener("click", onToggle);
    document.body.appendChild(button);

    return () => {
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("change", onChange, true);
      button.removeEventListener("click", onToggle);
      button.remove();
    };
  }, []);

  return null;
}
