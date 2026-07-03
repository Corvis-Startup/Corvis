"use client";

import { useEffect, useRef, useState } from "react";

const problems = [
  {
    tag: "The new problem",
    status: "No transfer path",
    title: "The real work now lives in accounts you can't inherit.",
    description:
      "Engineers build working systems inside personal AI accounts: prompt libraries, agentic workflows, and months of corrections fed to their coding agents. When the account is deactivated, it's gone. There is no transfer path, and none of it shows up in a standard exit interview.",
    points: [
      "Personal Claude Code, Cursor, and ChatGPT history",
      "Agentic workflows tuned over months",
      "Corrections and context that never left their machine",
    ],
    visual: "vanish",
  },
  {
    tag: "The old problem, now solvable",
    status: "Newly possible",
    title: "Institutional knowledge always leaked. Now it can be verified.",
    description:
      "Senior engineers have always walked out with tribal infrastructure knowledge. What's changed is that AI models are finally capable enough to attempt and verify a real workflow, not just summarize one. That capability is what makes the backtest possible.",
    points: [
      "Rerun a workflow instead of describing it",
      "Prove what still works and what doesn't",
      "Turn assumptions into evidence",
    ],
    visual: "verify",
  },
];

function VanishVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" role="img" aria-label="Knowledge vanishing from a deactivated account">
      <rect x="30" y="24" width="140" height="112" rx="4" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="44" y={40 + i * 18} width="112" height="9" rx="2" fill="currentColor">
          <animate attributeName="opacity" values="0.6;0.05;0.6" dur="2.4s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
          <animate attributeName="width" values="112;24;112" dur="2.4s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
        </rect>
      ))}
    </svg>
  );
}

function VerifyVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" role="img" aria-label="A workflow being rerun and verified">
      <rect x="30" y="24" width="140" height="112" rx="4" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <line x1="46" y1={44 + i * 24} x2="120" y2={44 + i * 24} stroke="currentColor" strokeWidth="2" opacity="0.3" />
          <circle cx="140" cy={44 + i * 24} r="7" fill="none" stroke="currentColor" strokeWidth="2">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </circle>
          <path d={`M 137 ${44 + i * 24} l 2.5 2.5 l 4.5 -5`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <animate attributeName="opacity" values="0;1;0" dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </path>
        </g>
      ))}
    </svg>
  );
}

function ProblemVisual({ type }: { type: string }) {
  return type === "verify" ? <VerifyVisual /> : <VanishVisual />;
}

function ProblemCard({ problem, index }: { problem: (typeof problems)[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative flex flex-col border border-border bg-card p-8 rounded-[2px] transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="flex items-center justify-between mb-8">
        <span className="eyebrow">{problem.tag}</span>
        <span
          className={`font-mono text-[11px] ${
            problem.visual === "verify" ? "text-foreground font-medium" : "text-faint"
          }`}
        >
          {problem.status}
        </span>
      </div>

      <div className="w-40 h-28 mb-8 text-foreground/50">
        <ProblemVisual type={problem.visual} />
      </div>

      <h3 className="text-2xl font-semibold tracking-[-0.02em] leading-tight mb-4 text-balance">{problem.title}</h3>
      <p className="text-muted-foreground leading-relaxed mb-8">{problem.description}</p>

      <ul className="mt-auto space-y-3 border-t border-border pt-6">
        {problem.points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-sm text-foreground/80">
            <span className="mt-2 w-1.5 h-1.5 shrink-0 bg-foreground" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section id="problem" ref={sectionRef} className="relative py-24 border-b border-border">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="mb-16 max-w-[720px]">
          <span className="eyebrow block mb-6">The problem</span>
          <h2
            className={`text-[2rem] lg:text-[2.5rem] font-semibold tracking-[-0.02em] leading-[1.15] text-balance transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Knowledge doesn&apos;t leave in a doc.
            <br />
            <span className="text-muted-foreground">It leaves in an account.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {problems.map((problem, index) => (
            <ProblemCard key={problem.tag} problem={problem} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
