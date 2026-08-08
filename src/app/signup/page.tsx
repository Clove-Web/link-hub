/* info/src/app/signup/page.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/* signup/page.tsx */

"use client";

import {
  Suspense,
  useEffect,
  useState,
  type FormEvent,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  page,
  card,
  title,
  subtitle,
  form,
  label,
  input,
  button,
  ghost,
  divider,
  error as errorClass,
} from "@styles/auth.css";

// Where PocketID lives. Its onboarding links look like <POCKETID>/st/<token>.
const pocketIdUrl =
  process.env.NEXT_PUBLIC_POCKETID_URL || "https://doughmination.xyz";

// Remember the last code the visitor entered, so they can come back later.
const storageKey = "doughmination:invite-code";

// Accept a raw token, or a full pasted URL — pull the bit after /st/ either way.
function normalizeCode(raw: string): string {
  const trimmed = raw.trim();
  const marker = trimmed.lastIndexOf("/st/");
  const code = marker >= 0 ? trimmed.slice(marker + 4) : trimmed;
  return code.replace(/[^A-Za-z0-9._-]/g, "");
}

function SignupForm() {
  const router = useRouter();
  const params = useSearchParams();

  const [code, setCode] = useState("");
  const [err, setErr] = useState("");

  // Prefill from the URL (?code=…) first, otherwise from a remembered code.
  useEffect(() => {
    const fromUrl = params.get("code");

    if (fromUrl) {
      setCode(fromUrl);
      return;
    }

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setCode(saved);
    } catch {
      // localStorage may be unavailable (private mode) — that's fine.
    }
  }, [params]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const clean = normalizeCode(code);

    if (!clean) {
      setErr("Enter your invite code.");
      return;
    }

    // Remember the code before showing the rules, so denying is reversible.
    try {
      localStorage.setItem(storageKey, clean);
    } catch {
      // storage may be unavailable
    }

    // Send them to the rules gate; PocketID is only reached after they agree.
    router.push(`/rules?code=${encodeURIComponent(clean)}`);
  }

  return (
    <main className={page}>
      <div className={card}>
        <h1 className={title}>Sign up</h1>

        <p className={subtitle}>
          Enter the invite code you were given to set up your passkey.
        </p>

        <form className={form} onSubmit={handleSubmit}>
          <label className={label} htmlFor="code">
            Invite code
          </label>

          <input
            id="code"
            className={input}
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
              setErr("");
            }}
            placeholder="hqm4k9a1VubBGckh"
            autoComplete="off"
            autoFocus
          />

          {err ? <p className={errorClass}>{err}</p> : null}

          <button type="submit" className={button}>
            Continue →
          </button>
        </form>

        <p className={divider}>Already have an account?</p>

        <a href={pocketIdUrl} className={ghost}>
          Log in
        </a>
      </div>
    </main>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupForm />
    </Suspense>
  );
}
