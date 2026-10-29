
"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";

const Membership = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    // Connect your newsletter API here.
    setIsSubscribed(true);
  };

  const handleChangeEmail = () => {
    setIsSubscribed(false);
  };

  return (
    <section className="border-b border-white/[0.08] bg-black/60">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 md:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Membership Introduction */}
          <div className="space-y-2.5 lg:col-span-6">
            <div className="flex items-center gap-2">
              <span className="size-2 animate-pulse rounded-full bg-emerald-500" />

              <span className="text-[10px] font-semibold tracking-[0.25em] text-neutral-400 uppercase">
                Private Access Dispatch
              </span>
            </div>

            <h3 className="text-2xl font-black tracking-tight text-white uppercase sm:text-3xl md:text-4xl">
              Join the TITASWÉB Archive
            </h3>

            <p className="max-w-lg text-sm leading-relaxed text-neutral-400">
              Receive exclusive drop announcements, private showroom
              invitations, and priority access to limited capsule collections
              before public release.
            </p>
          </div>

          {/* Subscription Form / Confirmation */}
          <div className="lg:col-span-6">
            {isSubscribed ? (
              <div className="flex items-center justify-between gap-4 rounded-xl border border-white/15 bg-white/5 p-5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/20 text-emerald-400">
                    <Check className="size-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-bold tracking-[0.15em] text-white uppercase">
                      Archive Membership Confirmed
                    </p>

                    <p className="mt-1 text-[11px] leading-relaxed text-neutral-400">
                      You have VIP priority access to upcoming limited
                      collections.
                    </p>

                    <p className="mt-1 truncate text-[10px] text-neutral-500">
                      {email}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleChangeEmail}
                  className="shrink-0 cursor-pointer text-[10px] tracking-[0.12em] text-neutral-400 uppercase underline transition-colors hover:text-white"
                >
                  Change Email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="relative flex-1">
                    <Mail className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-neutral-500" />

                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ENTER YOUR EMAIL FOR VIP ENTRY..."
                      aria-label="Email address for VIP membership"
                      className="w-full rounded-lg border border-white/15 bg-white/[0.04] py-3 pr-4 pl-11 font-sans text-xs tracking-wide text-white outline-none transition-all placeholder:text-neutral-500 hover:bg-white/[0.07] focus:border-white/40 focus:bg-white/[0.08] md:text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-sans text-xs font-bold tracking-[0.18em] text-black uppercase transition-colors hover:bg-neutral-200 active:bg-neutral-300"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <p className="pl-1 font-sans text-[10px] tracking-wide text-neutral-500">
                  Strict privacy · No marketing clutter · Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Membership;
