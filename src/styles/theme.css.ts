/* info/src/styles/theme.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/* styles/theme.css.ts */

import { createGlobalThemeContract } from "@vanilla-extract/css";

// The shape of the design system. Values are filled per-theme below.
//
// Uses createGlobalThemeContract (literal var names derived from the token path,
// e.g. color.bg -> --color-bg) rather than createThemeContract. The latter
// auto-generates file-scoped identifiers, which calls getFileScope — and the
// unstable Turbopack vanilla-extract integration fails to set a scope for this
// imported leaf module, throwing "Styles were unable to be assigned to a file".
// Providing explicit names sidesteps that entirely (this is what the system app
// does, which is why it compiles under Turbopack and this file previously didn't).
export const vars = createGlobalThemeContract(
  {
    color: {
      bg: null,
      surface: null,
      surfaceHover: null,
      text: null,
      muted: null,
      border: null,
      accent: null,
    },
    font: {
      sans: null,
      mono: null,
    },
    space: {
      xs: null,
      sm: null,
      md: null,
      lg: null,
      xl: null,
    },
    radius: {
      md: null,
      lg: null,
      full: null,
    },
  },
  (_value, path) => path.join("-"),
);

// Tokens shared across every theme (only color changes with dark mode).
const shared = {
  font: {
    // Comic Code everywhere — matches the personal site. Loaded via
    // @font-face in global.css.ts from the shared CDN.
    sans: "'Comic Code', ui-monospace, monospace",
    mono: "'Comic Code', ui-monospace, monospace",
  },
  space: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "2rem",
    xl: "4rem",
  },
  radius: {
    md: "0.75rem",
    lg: "1.25rem",
    full: "999px",
  },
};

// Light stays available for anyone who forces light mode, but tinted trans-pink
// so it still feels on-brand.
export const lightValues = {
  color: {
    bg: "#f8faff",
    surface: "#ffffff",
    surfaceHover: "#eef3ff",
    text: "#141726",
    muted: "#5b6480",
    border: "#e3e9f6",
    accent: "#d15f8c",
  },
  ...shared,
};

// Dark mode trans: deep blue-black canvas, trans-pink accent, cool muted text.
export const darkValues = {
  color: {
    bg: "#0a0b10",
    surface: "#12141c",
    surfaceHover: "#1b1e2a",
    text: "#f4f6fb",
    muted: "#9aa3c2",
    border: "#232838",
    accent: "#f5a9b8",
  },
  ...shared,
};
