"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const headline = "Institutional memory that doesn't walk out the door when engineers leave.";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative flex-1 flex items-center justify-center min-h-0">
      {/* Faint grid background */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:56px_56px] opacity-60 [mask-image:radial-gradient(ellipse_65%_70%_at_50%_45%,black_25%,transparent_100%)]"
      />
      <div className="relative w-full max-w-[860px] mx-auto px-6 pb-16 text-center">
        {/* Headline — staggered blur-in, word by word */}
        <h1 className="text-[clamp(2.5rem,4vw+1rem,4rem)] font-semibold tracking-[-0.02em] leading-[1.08]">
          {headline.split(" ").map((word, i) => (
            <span
              key={i}
              className="inline-block animate-char-in whitespace-pre"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {word}{" "}
            </span>
          ))}
        </h1>

        {/* Mission line */}
        <p
          className={`mt-6 text-lg lg:text-xl text-muted-foreground leading-[1.55] max-w-[560px] mx-auto transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Turning engineering offboarding into institutional memory that humans
          and AI agents can actually use.
        </p>

        {/* CTA */}
        <div
          className={`mt-10 flex justify-center transition-all duration-700 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            size="lg"
            className="btn-shine px-8 h-12 text-base rounded-[2px] group"
            asChild
          >
            <a href="/waitlist">
              Join waitlist
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
