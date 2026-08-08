/* info/src/app/rules/page.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/* rules/page.tsx */

"use client";

import {
  Suspense,
  useEffect,
  useState,
} from "react";

import { useSearchParams } from "next/navigation";

import {
  page,
  card,
  title,
  subtitle,
  button,
  ghost,
  rulesList,
  ruleItem,
  ruleMarker,
  rulesFooter,
  buttonRow,
  codeChip,
  notice,
} from "@styles/auth.css";

// Where PocketID lives. Its onboarding links look like <POCKETID>/st/<token>.
const pocketIdUrl =
  process.env.NEXT_PUBLIC_POCKETID_URL || "https://doughmination.xyz";

// Remember the last code the visitor entered, so a "deny" isn't a dead end —
// they can come back to the same code later.
const storageKey = "doughmination:invite-code";

// Edit me: rules a visitor must agree to before PocketID.
const siteRules = [
  "Be respectful of the resources, no harassment, hate speech, or targeted abuse, and PLEASE keep it legal",
  "Please don't change your username unless you get permission from an admin. (Stops resource hogging)",
  "One account per person unless you get admin permission.",
  "Your passkey is yours, don't share your account or invite codes.",
  "Think before you act/type, whatever you share on our domain relects onto us.",
];

// Accept a raw token, or a full pasted URL — pull the bit after /st/ either way.
function normalizeCode(raw: string): string {
  const trimmed = raw.trim();
  const marker = trimmed.lastIndexOf("/st/");
  const code = marker >= 0 ? trimmed.slice(marker + 4) : trimmed;
  return code.replace(/[^A-Za-z0-9._-]/g, "");
}

type Step = "rules" | "denied";

function RulesGate() {
  const params = useSearchParams();

  const [code, setCode] = useState("");
  const [step, setStep] = useState<Step>("rules");

  // Take the code from the URL (?code=…) first, otherwise a remembered one.
  useEffect(() => {
    const fromUrl = params.get("code");

    if (fromUrl) {
      const clean = normalizeCode(fromUrl);
      setCode(clean);

      try {
        localStorage.setItem(storageKey, clean);
      } catch {
        // localStorage may be unavailable (private mode) — that's fine.
      }

      return;
    }

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setCode(normalizeCode(saved));
    } catch {
      // storage may be unavailable
    }
  }, [params]);

  function handleAgree() {
    // Hand off to PocketID, which validates the token and runs passkey setup.
    window.location.href = `${pocketIdUrl}/st/${encodeURIComponent(code)}`;
  }

  function handleDeny() {
    setStep("denied");
  }

  function handleReconsider() {
    setStep("rules");
  }

  return (
    <main className={page}>
      <div className={card}>
        {step === "rules" && (
          <>
            <h1 className={title}>Before you continue</h1>

            <p className={subtitle}>
              {code ? (
                <>
                  Your code{" "}
                  <span className={codeChip}>{code}</span>{" "}
                  is ready. Please read and agree to our rules to finish
                  setting up.
                </>
              ) : (
                "Please read and agree to our rules to finish setting up."
              )}
            </p>

            <ul className={rulesList}>
              {siteRules.map((rule, index) => (
                <li key={index} className={ruleItem}>
                  <span className={ruleMarker} aria-hidden>
                    {index + 1}.
                  </span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>

            <p className={rulesFooter}>
              If you break these rules, your account will be disabled.
            </p>

            <div className={buttonRow}>
              <button
                type="button"
                className={ghost}
                onClick={handleDeny}
              >
                Deny
              </button>

              <button
                type="button"
                className={button}
                onClick={handleAgree}
              >
                Agree →
              </button>
            </div>
          </>
        )}

        {step === "denied" && (
          <>
            <h1 className={title}>No worries</h1>

            <p className={notice}>
              You denied our rules, so you weren&apos;t sent through to set up
              your account. Your invite code wasn&apos;t used, though — so you
              can come back any time if you change your mind.
            </p>

            <button
              type="button"
              className={button}
              onClick={handleReconsider}
            >
              Review the rules again
            </button>

            <a href={pocketIdUrl} className={ghost}>
              Log in instead
            </a>
          </>
        )}
      </div>
    </main>
  );
}

export default function RulesPage() {
  return (
    <Suspense fallback={null}>
      <RulesGate />
    </Suspense>
  );
}
