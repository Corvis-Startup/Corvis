"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const principles = [
  "Backtested, not self-reported",
  "Every gap is evidenced",
  "Output stays runnable",
];

export function TestimonialsSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section id="early-access" className="relative py-24 border-b border-border">
      <div className="max-w-[720px] mx-auto px-6 text-center">
        {/* Label */}
        <span className="eyebrow block mb-8">Early access</span>

        <h2 className="text-[2rem] lg:text-[2.5rem] font-semibold tracking-[-0.02em] leading-[1.15] text-balance mb-6">
          We&apos;re building Corvis with a
          <br />
          small group of design partners.
        </h2>

        <p className="text-base text-muted-foreground leading-[1.7] max-w-xl mx-auto mb-12 text-pretty">
          Corvis is pre-launch. If your team is losing hard-won engineering knowledge to
          turnover, request access and help shape how the memory layer works.
        </p>

        {/* Form */}
        {submitted ? (
          <div className="max-w-md mx-auto flex items-center justify-center gap-3 border border-border bg-card px-6 py-4 rounded-[2px]">
            <Check className="w-5 h-5 text-foreground shrink-0" />
            <span className="text-foreground">
              You&apos;re on the list. We&apos;ll be in touch about a demo.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
          >
            <label htmlFor="early-access-email" className="sr-only">
              Work email
            </label>
            <input
              id="early-access-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="flex-1 h-12 px-4 rounded-[2px] bg-background border border-border text-foreground placeholder:text-faint focus:outline-none focus:border-foreground transition-colors"
            />
            <Button
              type="submit"
              size="lg"
              className="h-12 px-6 text-base rounded-[2px] group shrink-0"
            >
              Request access
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        )}

        {/* Principles */}
        <div className="mt-16 pt-12 border-t border-border flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {principles.map((principle) => (
            <span key={principle} className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/30" />
              {principle}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
