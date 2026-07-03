"use client";

import { useEffect, useState, useRef } from "react";

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
    <section id="differentiator" ref={sectionRef} className="relative py-24 border-b border-border">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Header */}
        <div
          className={`max-w-[720px] mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="eyebrow block mb-6">Why Corvis</span>
          <h2 className="text-[2rem] lg:text-[2.5rem] font-semibold tracking-[-0.02em] leading-[1.15] text-balance mb-6">
            Open loop vs.
            <br />
            closed loop.
          </h2>
          <p className="text-base text-muted-foreground leading-[1.7]">
            Everyone else captures a claim and stores it as text. Corvis reruns the real
            workflow, proves what holds, and keeps it executable.
          </p>
        </div>

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-px bg-border border border-border rounded-[2px]">
          {/* Open loop column */}
          <div className="bg-background">
            <div className="flex items-center justify-between gap-4 px-6 lg:px-8 py-6 border-b border-border">
              <div>
                <div className="eyebrow mb-1">Open loop</div>
                <div className="text-xl font-semibold tracking-[-0.02em]">Exit interviews &amp; knowledge bases</div>
              </div>
            </div>
            <ul>
              {rows.map((row, i) => (
                <li
                  key={row.open}
                  className={`flex items-start gap-4 px-6 lg:px-8 py-5 border-b border-border last:border-b-0 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  }`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="mt-1 shrink-0 w-8 font-mono text-[11px] text-faint whitespace-nowrap">[x]</span>
                  <span className="text-faint">{row.open}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Closed loop column */}
          <div className="bg-card relative">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-foreground" />
            <div className="flex items-center justify-between gap-4 px-6 lg:px-8 py-6 border-b border-border">
              <div>
                <div className="eyebrow mb-1">Closed loop</div>
                <div className="text-xl font-semibold tracking-[-0.02em]">Corvis</div>
              </div>
              <span className="text-[10px] font-medium uppercase tracking-[0.12em] px-2 py-0.5 border border-border bg-secondary text-foreground rounded-full">
                Verified
              </span>
            </div>
            <ul>
              {rows.map((row, i) => (
                <li
                  key={row.closed}
                  className={`flex items-start gap-4 px-6 lg:px-8 py-5 border-b border-border last:border-b-0 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  }`}
                  style={{ transitionDelay: `${i * 60 + 120}ms` }}
                >
                  <span className="mt-1 shrink-0 w-8 font-mono text-[11px] font-semibold text-foreground whitespace-nowrap">[ok]</span>
                  <span className="text-foreground font-medium">{row.closed}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
