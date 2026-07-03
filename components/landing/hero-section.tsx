"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const words = ["Claude Code", "Cursor", "Slack fixes", "tribal knowledge"];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative border-b border-border">
      <div className="max-w-[1100px] mx-auto px-6 pt-40 pb-24">
        {/* Eyebrow */}
        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="eyebrow">Executable company memory</span>
        </div>

        {/* Main headline */}
        <div className="mb-12">
          <h1
            className={`text-[clamp(3rem,5vw+1rem,4.5rem)] font-semibold tracking-[-0.02em] leading-[1.05] transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block">When an engineer</span>
            <span className="block">leaves, so does</span>
            <span className="block">
              their{" "}
              <span className="relative inline-block">
                <span key={wordIndex} className="inline-flex">
                  {words[wordIndex].split("").map((char, i) => (
                    <span
                      key={`${wordIndex}-${i}`}
                      className="inline-block animate-char-in"
                      style={{
                        animationDelay: `${i * 50}ms`,
                      }}
                    >
                      {char === " " ? " " : char}
                    </span>
                  ))}
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-foreground" />
              </span>
            </span>
          </h1>
        </div>

        {/* Description */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-end">
          <p
            className={`text-lg text-muted-foreground leading-[1.7] max-w-[720px] transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Their work now lives inside personal AI tools, Slack threads, and tribal fixes
            that never surface in an exit interview. Corvis backtests their real workflows
            in a sandbox, verifies what actually works, and keeps the proven parts runnable.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button size="lg" className="px-8 h-12 text-base rounded-[2px] group" asChild>
              <a href="#early-access">
                Book a demo
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base rounded-[2px]"
              asChild
            >
              <a href="#how-it-works">See how it works</a>
            </Button>
          </div>
        </div>

        {/* What walks out the door */}
        <p
          className={`eyebrow mt-20 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Claude Code · Cursor · Slack threads · prompt libraries — none of it survives offboarding
        </p>
      </div>
    </section>
  );
}
