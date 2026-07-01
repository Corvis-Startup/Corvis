"use client";

import { useEffect, useState, useRef } from "react";
import { UserMinus, Network, Terminal } from "lucide-react";

const useCases = [
  {
    icon: UserMinus,
    title: "High turnover risk",
    description:
      "When a staff or senior engineer gives notice, the countdown starts. Nomos captures what they built before the account goes dark.",
  },
  {
    icon: Network,
    title: "Complex tribal infrastructure",
    description:
      "The undocumented incident playbooks, the manual steps, the why behind the workaround. Nomos proves which ones still work.",
  },
  {
    icon: Terminal,
    title: "Heavy personal-AI reliance",
    description:
      "Teams living in Claude Code, Cursor, and ChatGPT accumulate real leverage that lives nowhere shared. Nomos makes it inheritable.",
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
    <section id="use-cases" ref={sectionRef} className="relative py-24 lg:py-32 bg-card/30 border-y border-foreground/10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-accent" />
              Who it&apos;s for
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight text-balance mb-8">
              Built for the teams
              <br />
              with the most to lose.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12 text-pretty">
              Nomos is for engineering leaders and VPs of Engineering who feel the risk
              every time a key engineer resigns. It matters most where knowledge is tribal,
              infrastructure is complex, and the real work happens inside personal AI tools.
            </p>

            {/* Audience tags */}
            <div className="flex flex-wrap gap-3">
              {audience.map((item, index) => (
                <span
                  key={item}
                  className={`px-4 py-2 border border-foreground/10 text-sm font-mono transition-all duration-500 ${
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
                className={`p-6 border border-foreground/10 bg-background hover:border-foreground/20 transition-all duration-500 group ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center border border-foreground/10 group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-colors duration-300">
                    <useCase.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1 group-hover:translate-x-1 transition-transform duration-300">
                      {useCase.title}
                    </h3>
                    <p className="text-muted-foreground">{useCase.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
