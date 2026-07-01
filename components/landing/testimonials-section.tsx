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
    <section
      id="early-access"
      className="relative py-32 lg:py-40 border-t border-foreground/10"
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
        {/* Label */}
        <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8">
          <span className="w-8 h-px bg-accent" />
          Early access
          <span className="w-8 h-px bg-accent" />
        </span>

        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-balance mb-6">
          We&apos;re building Nomos with a
          <br />
          small group of design partners.
        </h2>

        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-12 text-pretty">
          Nomos is pre-launch. If your team is losing hard-won engineering knowledge to
          turnover, request access and help shape how the memory layer works.
        </p>

        {/* Form */}
        {submitted ? (
          <div className="max-w-md mx-auto flex items-center justify-center gap-3 border border-verified/40 bg-verified/10 px-6 py-5 rounded-full">
            <Check className="w-5 h-5 text-verified shrink-0" />
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
              className="flex-1 h-14 px-6 rounded-full bg-card border border-foreground/15 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
            />
            <Button
              type="submit"
              size="lg"
              className="bg-foreground hover:bg-foreground/90 text-background h-14 px-8 text-base rounded-full group shrink-0"
            >
              Request access
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        )}

        {/* Principles */}
        <div className="mt-16 pt-12 border-t border-foreground/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {principles.map((principle) => (
            <span key={principle} className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {principle}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
