/* info/src/styles/auth.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/* styles/auth.css.ts */

import { style } from "@vanilla-extract/css";

import { vars } from "./theme.css";

export const page = style({
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.lg,
  padding: vars.space.lg,
});

export const card = style({
  width: "100%",
  maxWidth: "26rem",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  padding: vars.space.lg,
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
});

export const title = style({
  fontSize: "1.6rem",
  fontWeight: 700,
  letterSpacing: "-0.02em",
});

export const subtitle = style({
  fontSize: "0.95rem",
  color: vars.color.muted,
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const label = style({
  fontSize: "0.85rem",
  fontWeight: 600,
  color: vars.color.muted,
});

export const input = style({
  width: "100%",
  padding: vars.space.sm,
  fontSize: "1rem",
  fontFamily: vars.font.mono,
  color: vars.color.text,
  background: vars.color.bg,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  selectors: {
    "&:focus": {
      outline: "none",
      borderColor: vars.color.accent,
    },
  },
});

export const button = style({
  width: "100%",
  padding: vars.space.sm,
  fontSize: "1rem",
  fontWeight: 700,
  cursor: "pointer",
  color: "#0a0b10",
  background: "linear-gradient(90deg, #5BCEFA, #F5A9B8)",
  border: "none",
  borderRadius: vars.radius.md,
  textAlign: "center",
  textDecoration: "none",
  transition: "opacity 0.15s ease",
  selectors: {
    "&:hover": { opacity: 0.9 },
    "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
  },
});

export const ghost = style({
  width: "100%",
  padding: vars.space.sm,
  fontSize: "0.95rem",
  cursor: "pointer",
  color: vars.color.text,
  background: "transparent",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  textAlign: "center",
  textDecoration: "none",
  transition: "background 0.15s ease",
  selectors: {
    "&:hover": { background: vars.color.surfaceHover },
  },
});

export const divider = style({
  fontSize: "0.8rem",
  color: vars.color.muted,
  textAlign: "center",
});

export const error = style({
  fontSize: "0.85rem",
  color: "#ef4444",
});

export const rulesList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  margin: 0,
  padding: 0,
  listStyle: "none",
});

export const ruleItem = style({
  display: "flex",
  gap: vars.space.sm,
  fontSize: "0.9rem",
  lineHeight: 1.45,
  color: vars.color.text,
  padding: vars.space.sm,
  background: vars.color.bg,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
});

export const ruleMarker = style({
  flexShrink: 0,
  fontWeight: 700,
  color: vars.color.accent,
});

export const buttonRow = style({
  display: "flex",
  gap: vars.space.sm,
});

export const codeChip = style({
  fontFamily: vars.font.mono,
  fontSize: "0.85rem",
  color: vars.color.accent,
  wordBreak: "break-all",
});

export const notice = style({
  fontSize: "0.9rem",
  lineHeight: 1.5,
  color: vars.color.muted,
  padding: vars.space.md,
  background: vars.color.bg,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
});

export const rulesFooter = style({
  fontSize: "0.8rem",
  lineHeight: 1.4,
  color: vars.color.muted,
  textAlign: "center",
});
