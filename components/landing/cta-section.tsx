"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24">
      <div className="max-w-[1100px] mx-auto px-6">
        <div
          className={`border border-border bg-card rounded-[2px] px-8 py-20 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-[2rem] lg:text-[2.5rem] font-semibold tracking-[-0.02em] leading-[1.15] text-balance max-w-[720px] mx-auto mb-8">
            Don&apos;t let your best engineers walk out
            <br className="hidden lg:block" />
            with your company&apos;s memory.
          </h2>

          <p className="text-base text-muted-foreground leading-[1.7] max-w-[560px] mx-auto mb-12 text-pretty">
            Close the loop before the account goes dark. Backtest what they built,
            keep what works, and hand it to whoever comes next.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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

          <p className="eyebrow mt-10">Pre-launch · onboarding design partners now</p>
        </div>
      </div>
    </section>
  );
}
