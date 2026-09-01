/* info/src/styles/home.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/* styles/home.css.ts */

import { style, keyframes } from "@vanilla-extract/css";

import { vars } from "./theme.css";

const slide = keyframes({ to: { backgroundPositionX: "200%" } });

const riseIn = keyframes({
  from: { opacity: 0, transform: "translateY(16px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

const centerIn = keyframes({
  from: { opacity: 0, transform: "translateX(-40px)" },
  to: { opacity: 1, transform: "translateX(0)" },
});

const float = keyframes({
  "0%, 100%": { transform: "translateY(0)" },
  "50%": { transform: "translateY(-6px)" },
});

const spinGlow = keyframes({
  to: { transform: "rotate(360deg)" },
});

const blink = keyframes({
  "0%, 45%": { opacity: 1 },
  "50%, 95%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const dropIn = keyframes({
  from: { opacity: 0, transform: "translateY(-12px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const page = style({
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.xl,
  padding: vars.space.lg,
});

const avatarBox = {
  width: 176,
  height: 196,
  disc: 140,
  radius: 70,
  discCenterX: 78,
};

export const avatarWrap = style({
  position: "relative",
  zIndex: 2,
  width: `${avatarBox.width}px`,
  height: `${avatarBox.height}px`,
  // Independent rotate so it composes with the float animation.
  rotate: "6deg",
  animationName: float,
  animationDuration: "5s",
  animationTimingFunction: "ease-in-out",
  animationIterationCount: "infinite",
  "@media": {
    "(prefers-reduced-motion: reduce)": { animation: "none" },
  },
});

export const avatarDisc = style({
  position: "absolute",
  left: `${avatarBox.discCenterX - avatarBox.radius}px`,
  bottom: 0,
  width: `${avatarBox.disc}px`,
  height: `${avatarBox.disc}px`,
  borderRadius: vars.radius.full,
  background: vars.color.surface,
  border: `2px solid ${vars.color.border}`,
  boxShadow: "0 12px 32px -10px rgba(91,206,250,0.35)",
  zIndex: 0,
  "::before": {
    content: "",
    position: "absolute",
    inset: "-7px",
    borderRadius: vars.radius.full,
    background:
      "conic-gradient(from 0deg, #5BCEFA, #F5A9B8, #ffffff, #F5A9B8, #5BCEFA)",
    filter: "blur(11px)",
    opacity: 0.65,
    zIndex: -1,
    animationName: spinGlow,
    animationDuration: "9s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
});

// Visible region = disc circle + full-width strip above the disc centre, so the
// head pokes out the top while the lower body stays clipped to the ring.
const maskDiscCenter = {
  x: avatarBox.discCenterX + 7,
  y: 120,
};

const maskLayers =
  `radial-gradient(circle ${avatarBox.radius}px at ${maskDiscCenter.x}px ${maskDiscCenter.y}px, #000 ${avatarBox.radius - 1}px, transparent ${avatarBox.radius}px), ` +
  `linear-gradient(#000, #000)`;

export const avatar = style({
  position: "absolute",
  left: "-7px",
  bottom: 0,
  width: "190px",
  height: "190px",
  zIndex: 1,
  objectFit: "cover",
  transformOrigin: "center bottom",
  transition: "transform 0.3s ease",
  WebkitMaskImage: maskLayers,
  maskImage: maskLayers,
  WebkitMaskRepeat: "no-repeat, no-repeat",
  maskRepeat: "no-repeat, no-repeat",
  WebkitMaskSize: "100% 100%, 100% 120px",
  maskSize: "100% 100%, 100% 120px",
  WebkitMaskPosition: "0 0, 0 0",
  maskPosition: "0 0, 0 0",
  selectors: {
    [`${avatarWrap}:hover &`]: {
      transform: "scale(1.05) translateY(-2px)",
    },
  },
});

export const header = style({
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.sm,
  maxWidth: "100%",
  animation: `${riseIn} 0.6s ease both`,
  "@media": {
    "(prefers-reduced-motion: reduce)": { animation: "none" },
  },
});

// Avatar and wordmark bound as one unit so the tagline below cannot move them.
// Avatar sits above the wordmark, which types/retypes on its own.
export const brand = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.xs,
  animation: `${centerIn} 0.7s cubic-bezier(.2,.8,.2,1) both`,
  "@media": {
    "(prefers-reduced-motion: reduce)": { animation: "none" },
  },
});

export const name = style({
  fontSize: "clamp(2rem, 6vw, 3rem)",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  whiteSpace: "pre",
  display: "flex",
  alignItems: "baseline",
  backgroundImage:
    "linear-gradient(90deg, #5BCEFA, #F5A9B8, #ffffff, #F5A9B8, #5BCEFA, #5BCEFA)",
  backgroundSize: "200% 100%",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  animation: `${slide} 6s linear infinite`,
  filter:
    "drop-shadow(0 0 14px rgba(91, 206, 250, 0.28)) drop-shadow(0 0 14px rgba(245, 169, 184, 0.28))",
  "@media": {
    "(prefers-reduced-motion: reduce)": { animation: "none" },
  },
});

// The label part that types and untypes. It shrink-wraps the typed text so the
// label and ".is-a.dev" travel together and the pair stays centred.
// The padding is the caret's lane: the cursor is taken out of flow and parked
// there, so ".is-a.dev" never shifts as the caret blinks on and off.
// The typed label. Keep it plain text with no transformed or positioned
// descendants: either would drop the glyphs out of the h1's
// background-clip: text and render them invisible.
export const nameTyped = style({
  whiteSpace: "pre",
});

export const tagline = style({
  fontSize: "1.05rem",
  color: vars.color.muted,
  fontFamily: vars.font.mono,
  // Reserve a line and centre the anchor so typing does not shift the layout.
  minHeight: "1.6em",
  width: "100%",
  textAlign: "center",
});

// Tagline only; the wordmark types without a caret.
export const cursor = style({
  display: "inline-block",
  marginLeft: "1px",
  color: vars.color.accent,
  fontWeight: 700,
  animation: `${blink} 1.1s step-end infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": { animation: "none" },
  },
});

// 58rem holds exactly three 15rem columns plus gaps (47rem) without leaving
// room for a fourth (63rem), so desktop lands on 3 across and auto-fit still
// steps down to 2 and then 1 as the viewport narrows.
export const grid = style({
  width: "100%",
  maxWidth: "58rem",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
  gap: vars.space.md,
});

// Deliberately motionless. The cards used to animate in, tilt on hover, and
// fly apart on click; the click animation wrote inline opacity/transform and
// then navigated, so a bfcache back-navigation restored the page with every
// card still exploded. Hover is a plain colour change now.
export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  padding: vars.space.lg,
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  transition: "background 0.2s ease, border-color 0.2s ease",
  selectors: {
    "&:hover": {
      background: vars.color.surfaceHover,
      borderColor: vars.color.accent,
    },
  },
});

export const cardTitle = style({
  fontSize: "1.1rem",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  gap: vars.space.xs,
});

export const cardArrow = style({
  color: vars.color.accent,
});

export const cardDesc = style({
  fontSize: "0.9rem",
  color: vars.color.muted,
});

export const actions = style({
  position: "fixed",
  top: vars.space.md,
  right: vars.space.md,
  display: "flex",
  gap: vars.space.xs,
  zIndex: 10,
  animation: `${dropIn} 0.6s ease both 0.2s`,
  "@media": {
    "(prefers-reduced-motion: reduce)": { animation: "none" },
  },
});

export const btnPrimary = style({
  padding: `${vars.space.xs} ${vars.space.md}`,
  fontSize: "0.9rem",
  fontWeight: 700,
  color: "#0a0b10",
  // Wide gradient that shimmers left-to-right, matching the wordmark.
  backgroundImage:
    "linear-gradient(90deg, #5BCEFA, #F5A9B8, #ffffff, #F5A9B8, #5BCEFA)",
  backgroundSize: "200% 100%",
  border: "none",
  borderRadius: vars.radius.full,
  textDecoration: "none",
  animation: `${slide} 6s linear infinite`,
  transition: "transform 0.18s ease, box-shadow 0.18s ease",
  selectors: {
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 22px -8px rgba(245,169,184,0.6)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": { animation: "none" },
  },
});

export const btnSecondary = style({
  padding: `${vars.space.xs} ${vars.space.md}`,
  fontSize: "0.9rem",
  fontWeight: 600,
  color: vars.color.text,
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.full,
  textDecoration: "none",
  transition:
    "background 0.18s ease, border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease",
  selectors: {
    "&:hover": {
      background: vars.color.surfaceHover,
      borderColor: vars.color.accent,
      transform: "translateY(-2px)",
      boxShadow: "0 8px 22px -10px rgba(91,206,250,0.45)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
  },
});

export const footer = style({
  fontSize: "0.85rem",
  color: vars.color.muted,
  fontFamily: vars.font.mono,
  animation: `${riseIn} 0.6s ease both 0.5s`,
  "@media": {
    "(prefers-reduced-motion: reduce)": { animation: "none" },
  },
});
