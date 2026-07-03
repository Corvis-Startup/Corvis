"use client";

import { useEffect, useState, useRef } from "react";

const useCases = [
  {
    title: "High turnover risk",
    description:
      "When a staff or senior engineer gives notice, the countdown starts. Corvis captures what they built before the account goes dark.",
  },
  {
    title: "Complex tribal infrastructure",
    description:
      "The undocumented incident playbooks, the manual steps, the why behind the workaround. Corvis proves which ones still work.",
  },
  {
    title: "Heavy personal-AI reliance",
    description:
      "Teams living in Claude Code, Cursor, and ChatGPT accumulate real leverage that lives nowhere shared. Corvis makes it inheritable.",
  },
];

const audience = ["VP Engineering", "Heads of Platform", "Staff+ departures", "Infra-heavy orgs"];

export function SecuritySection() {
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
    <section id="use-cases" ref={sectionRef} className="relative py-24 border-b border-border">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="eyebrow block mb-6">Who it&apos;s for</span>
            <h2 className="text-[2rem] lg:text-[2.5rem] font-semibold tracking-[-0.02em] leading-[1.15] text-balance mb-8">
              Built for the teams
              <br />
              with the most to lose.
            </h2>
            <p className="text-base text-muted-foreground leading-[1.7] mb-12 text-pretty">
              Corvis is for engineering leaders and VPs of Engineering who feel the risk
              every time a key engineer resigns. It matters most where knowledge is tribal,
              infrastructure is complex, and the real work happens inside personal AI tools.
            </p>

            {/* Audience tags */}
            <div className="flex flex-wrap gap-3">
              {audience.map((item, index) => (
                <span
                  key={item}
                  className={`px-3 py-1.5 bg-secondary text-foreground text-[11px] uppercase tracking-[0.12em] font-medium rounded-full transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Use cases */}
          <div className="grid gap-6">
            {useCases.map((useCase, index) => (
              <div
                key={useCase.title}
                className={`p-6 border border-border bg-card rounded-[2px] transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <span className="font-mono text-[11px] text-faint">0{index + 1}</span>
                <h3 className="text-lg font-medium mt-2 mb-1">{useCase.title}</h3>
                <p className="text-muted-foreground">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
