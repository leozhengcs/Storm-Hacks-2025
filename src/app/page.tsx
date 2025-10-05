"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(null);
    const form = new FormData(e.currentTarget);
    const user_id = form.get("id");
    const password = form.get("password");

    if (!user_id || !password) {
      setErr("Please enter a valid User ID / Password");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ user_id, password }),
      });

      if (res.ok) {
        window.location.href = "/dashboard";
      } else {
        const data = await res.json().catch(() => ({}));
        setErr(data?.error || "Invalid credentials.");
      }
    } catch (error) {
      setErr("Something went wrong, please try again");
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-svh bg-gradient-to-br from-slate-50 to-slate-100 dark:from-neutral-900 dark:to-neutral-950 text-slate-900 dark:text-slate-100">
      <div className="mx-auto flex min-h-svh max-w-7xl items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Brand / Header */}
          <div className="mb-8 text-center">
            {/* <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-sm font-medium text-white dark:bg-white dark:text-black">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Data Analytics
            </div> */}
            <h1 className="mt-4 text-2xl font-semibold tracking-tight">
              Sign in
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Access your dashboards and reports.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/70">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Email */}
              <div>
                <label htmlFor="id" className="mb-1 block text-sm font-medium">
                  User ID
                </label>
                <input
                  id="id"
                  name="id"
                  type="text"
                  autoComplete="id"
                  required
                  className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-neutral-600 dark:focus:ring-neutral-800"
                  placeholder="User ID"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPw ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 pr-10 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-neutral-600 dark:focus:ring-neutral-800"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    className="absolute inset-y-0 right-0 mr-1 inline-flex items-center rounded-md px-2 text-xs text-slate-500 hover:text-slate-700 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:ring-neutral-800"
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-200 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:ring-neutral-800"
                  />
                  Remember me
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-slate-900 underline-offset-4 hover:underline dark:text-slate-100"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Error */}
              {err && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
                >
                  {err}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60 dark:bg-white dark:text-black"
              >
                {loading ? "Signing in…" : "Sign in"}
              </button>

              {/* Social (placeholder) */}
              <button
                type="button"
                onClick={() => alert("Wire this up to your OAuth provider")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-50 dark:border-neutral-700 dark:bg-neutral-950 dark:text-slate-100 dark:hover:bg-neutral-900"
              >
                {/* You can replace with an icon */}
                Continue with Google
              </button>
            </form>

            {/* Helper / Demo creds */}
            <p className="mt-6 text-center text-xs text-slate-500 dark:text-neutral-400">
              Demo: <code>https://storm-hacks-2025-demo-app.vercel.app</code>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
