"use client";

import { useEffect, useState, useRef } from "react";
import { X, Check } from "lucide-react";

const rows = [
  {
    open: "Stores what an engineer says they know",
    closed: "Verifies what they actually know",
  },
  {
    open: "Captured once in an exit interview",
    closed: "Proven by rerunning the actual workflow",
  },
  {
    open: "Assumed to still be accurate",
    closed: "Evidenced, with every gap shown",
  },
  {
    open: "Static documents",
    closed: "Executable artifacts that stay runnable",
  },
  {
    open: "Nobody rereads them",
    closed: "Agents and engineers trigger them directly",
  },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="differentiator" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`max-w-3xl mb-16 lg:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-accent" />
            Why Nomos
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight text-balance mb-6">
            Open loop vs.
            <br />
            closed loop.
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Everyone else captures a claim and stores it as text. Nomos reruns the real
            workflow, proves what holds, and keeps it executable.
          </p>
        </div>

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
          {/* Open loop column */}
          <div className="bg-background">
            <div className="flex items-center justify-between gap-4 px-6 lg:px-8 py-6 border-b border-foreground/10">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-gap mb-1">Open loop</div>
                <div className="font-display text-xl">Exit interviews &amp; knowledge bases</div>
              </div>
            </div>
            <ul>
              {rows.map((row, i) => (
                <li
                  key={row.open}
                  className={`flex items-start gap-4 px-6 lg:px-8 py-5 border-b border-foreground/5 last:border-b-0 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  }`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="mt-0.5 shrink-0 w-5 h-5 flex items-center justify-center rounded-full border border-gap/40 text-gap">
                    <X className="w-3 h-3" />
                  </span>
                  <span className="text-muted-foreground">{row.open}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Closed loop column */}
          <div className="bg-card/50 relative">
            <div className="absolute inset-x-0 top-0 h-px bg-accent" />
            <div className="flex items-center justify-between gap-4 px-6 lg:px-8 py-6 border-b border-foreground/10">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-verified mb-1">Closed loop</div>
                <div className="font-display text-xl">Nomos</div>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-verified/40 text-verified rounded-full">
                Verified
              </span>
            </div>
            <ul>
              {rows.map((row, i) => (
                <li
                  key={row.closed}
                  className={`flex items-start gap-4 px-6 lg:px-8 py-5 border-b border-foreground/5 last:border-b-0 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  }`}
                  style={{ transitionDelay: `${i * 60 + 120}ms` }}
                >
                  <span className="mt-0.5 shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-verified/15 text-verified">
                    <Check className="w-3 h-3" />
                  </span>
                  <span className="text-foreground">{row.closed}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
