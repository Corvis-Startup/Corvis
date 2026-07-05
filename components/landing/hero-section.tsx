"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const words = [
  "prompt library",
  "debugging know-how",
  "deploy ritual",
  "tacit knowledge",
  "on-call intuition",
  "hard-won context",
  "tribal knowledge",
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex-1 flex items-center justify-center min-h-0">
      {/* Faint grid background */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:56px_56px] opacity-60 [mask-image:radial-gradient(ellipse_65%_70%_at_50%_45%,black_25%,transparent_100%)]"
      />
      <div className="relative w-full max-w-[860px] mx-auto px-6 pb-16 text-center">
        {/* Headline — original cycling-word animation */}
        <h1
          className={`text-[clamp(2.5rem,4vw+1rem,4rem)] font-semibold tracking-[-0.02em] leading-[1.08] transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="block">When an engineer</span>
          <span className="block">
            leaves, so does their{" "}
            <span className="relative inline-block">
              <span key={wordIndex} className="inline-flex">
                {words[wordIndex].split("").map((char, i) => (
                  <span
                    key={`${wordIndex}-${i}`}
                    className="inline-block animate-char-in"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    {char === " " ? " " : char}
                  </span>
                ))}
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-foreground" />
            </span>
          </span>
        </h1>

        {/* Mission line */}
        <p
          className={`mt-6 text-lg lg:text-xl text-muted-foreground leading-[1.55] max-w-[560px] mx-auto transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Turning engineering offboarding into institutional memory that humans
          and AI agents can actually use.
        </p>

        {/* CTA */}
        <div
          className={`mt-10 flex justify-center transition-all duration-700 delay-500 ${
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
