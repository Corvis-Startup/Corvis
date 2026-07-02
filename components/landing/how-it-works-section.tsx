"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Ingest",
    description:
      "Nomos pulls the departing engineer's full operational footprint across GitHub, Slack, Linear/Jira, CI/CD, and their personal AI tool history.",
    file: "ingest.log",
    code: `$ nomos ingest --engineer dana@company.com
> github     1,204 commits, 88 PRs
> slack      3,410 threads
> linear     212 issues resolved
> ci/cd      churn + deploy history
> ai history claude code, cursor, chatgpt
> [OK] footprint assembled. 847 artifacts`,
  },
  {
    number: "02",
    title: "Backtest",
    description:
      "It reruns their critical workflows in an isolated sandbox. Whatever breaks is a proven, evidenced knowledge gap, not a guess.",
    file: "backtest.log",
    code: `$ nomos backtest --engineer dana@company.com
> ingesting footprint... 847 artifacts
> replaying 23 critical workflows
> [OK]   deploy-staging.workflow
> [OK]   rotate-db-credentials
> [FAIL] hotfix-payments-queue — missing step: manual flush
> [FAIL] restore-from-snapshot — replica skip undocumented
> gap report ready. 2 verified gaps found.
launching targeted interview...`,
  },
  {
    number: "03",
    title: "Interview",
    description:
      "A targeted AI interview covers only the verified gaps and the judgment calls a backtest can't capture. The why, not the what.",
    file: "interview.log",
    code: `$ nomos interview --gaps-only
> hotfix-payments-queue
  "Why flush before redeploying?"
> [OK] captured: race condition context
> restore-from-snapshot
  "When do you skip the replica?"
> [OK] captured: judgment call
> gaps resolved. 2 of 2`,
  },
  {
    number: "04",
    title: "Store",
    description:
      "The output is an executable memory layer: a queryable Slack bot plus runnable workflows future engineers and AI agents can trigger directly.",
    file: "store.log",
    code: `$ nomos publish
> slack bot   /ask-nomos ready
> workflows   5 runnable, versioned
> agents      MCP endpoint live
> [OK] memory layer is executable`,
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 border-b border-border bg-card"
    >
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <span className="eyebrow block mb-6">How it works</span>
          <h2
            className={`text-[2rem] lg:text-[2.5rem] font-semibold tracking-[-0.02em] leading-[1.15] text-balance transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            A closed loop, in four steps.
            <br />
            <span className="text-muted-foreground">Ingest. Backtest. Interview. Store.</span>
          </h2>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Steps */}
          <div className="space-y-0">
            {steps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`w-full text-left py-8 border-b border-border transition-all duration-500 ${
                  activeStep === index ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
              >
                <div className="flex items-start gap-6">
                  <span
                    className={`font-mono text-xs mt-1.5 transition-colors ${
                      activeStep === index ? "text-foreground" : "text-faint"
                    }`}
                  >
                    {step.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold tracking-[-0.02em] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>

                    {/* Progress indicator */}
                    {activeStep === index && (
                      <div className="mt-4 h-px bg-border overflow-hidden">
                        <div
                          className="h-full bg-foreground w-0"
                          style={{ animation: "progress 5s linear forwards" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Terminal display — the one dark element on the page */}
          <div className="lg:sticky lg:top-32 self-start">
            <div className="bg-[#111111] text-white overflow-hidden rounded-[2px]">
              {/* Window header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                </div>
                <span className="font-mono text-[11px] text-white/40">{steps[activeStep].file}</span>
              </div>

              {/* Code content */}
              <div className="p-6 lg:p-8 font-mono text-sm min-h-[300px]">
                <pre className="whitespace-pre-wrap">
                  {steps[activeStep].code.split("\n").map((line, lineIndex) => {
                    const isFail = line.includes("[FAIL]");
                    const isPass = line.includes("[OK]");
                    const isCmd = line.startsWith("$");
                    const color = isFail
                      ? "text-white font-semibold"
                      : isCmd
                        ? "text-white"
                        : isPass
                          ? "text-white/70"
                          : "text-white/50";
                    return (
                      <div
                        key={`${activeStep}-${lineIndex}`}
                        className={`leading-loose code-line-reveal ${color}`}
                        style={{ animationDelay: `${lineIndex * 70}ms` }}
                      >
                        {line === "" ? " " : line}
                      </div>
                    );
                  })}
                </pre>
              </div>

              {/* Status */}
              <div className="px-6 py-4 border-t border-white/10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-white/40" />
                <span className="font-mono text-[11px] text-white/40">
                  step {steps[activeStep].number} / 04
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        .code-line-reveal {
          opacity: 0;
          transform: translateX(-8px);
          animation: lineReveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes lineReveal {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
