"use client";

import { useState, useEffect, useRef } from "react";
import { Copy, Check } from "lucide-react";

const codeExamples = [
  {
    label: "Ask in Slack",
    code: `@corvis how do we rotate DB creds?

> workflow: rotate-db-credentials
  1. drain replica traffic
  2. rotate secret in vault
  3. redeploy api + verify
  source: @dana · verified 3d ago
  [ run workflow ]`,
  },
  {
    label: "Run a workflow",
    code: `$ corvis run hotfix-payments-queue

> flushing stuck queue......... ok
> redeploying workers.......... ok
> verifying throughput......... ok

completed in 42s`,
  },
  {
    label: "Trigger from an agent",
    code: `await corvis.workflows.run(
  'restore-from-snapshot',
  { env: 'staging' }
)

// agent executed verified memory`,
  },
];

const features = [
  {
    title: "Queryable Slack bot",
    description: "Ask a question, get the proven workflow behind it.",
  },
  {
    title: "Runnable workflows",
    description: "Not docs. Steps future engineers can actually trigger.",
  },
  {
    title: "Agent-ready",
    description: "AI agents call the same verified memory via API.",
  },
  {
    title: "Versioned & evidenced",
    description: "Every artifact traces back to a passing backtest.",
  },
];

const codeAnimationStyles = `
  .dev-code-line {
    opacity: 0;
    transform: translateX(-8px);
    animation: devLineReveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @keyframes devLineReveal {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .dev-code-line {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }
`;

export function DevelopersSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
    <section id="memory-layer" ref={sectionRef} className="relative py-24 border-b border-border">
      <style dangerouslySetInnerHTML={{ __html: codeAnimationStyles }} />
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="eyebrow block mb-6">The memory layer</span>
            <h2 className="text-[2rem] lg:text-[2.5rem] font-semibold tracking-[-0.02em] leading-[1.15] text-balance mb-8">
              Memory you can
              <br />
              <span className="text-muted-foreground">actually run.</span>
            </h2>
            <p className="text-base text-muted-foreground mb-12 leading-[1.7] text-pretty">
              The output isn&apos;t a document nobody rereads. It&apos;s a queryable Slack bot and
              a set of runnable workflows that future engineers and AI agents can trigger directly.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  <h3 className="font-medium mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Code block */}
          <div
            className={`lg:sticky lg:top-32 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-border bg-card rounded-[2px]">
              {/* Tabs */}
              <div className="flex items-center border-b border-border">
                {codeExamples.map((example, idx) => (
                  <button
                    key={example.label}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`px-6 py-4 text-[13px] font-mono transition-colors relative ${
                      activeTab === idx
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {example.label}
                    {activeTab === idx && (
                      <span className="absolute bottom-0 left-0 right-0 h-px bg-foreground" />
                    )}
                  </button>
                ))}
                <div className="flex-1" />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-4 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Copy code"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-foreground" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Code content */}
              <div className="p-6 font-mono text-[13px] min-h-[220px]">
                <pre className="text-foreground/80">
                  {codeExamples[activeTab].code.split('\n').map((line, lineIndex) => (
                    <div
                      key={`${activeTab}-${lineIndex}`}
                      className="leading-loose dev-code-line"
                      style={{ animationDelay: `${lineIndex * 80}ms` }}
                    >
                      {line === '' ? ' ' : line}
                    </div>
                  ))}
                </pre>
              </div>
            </div>

            {/* Links */}
            <div className="mt-6 flex items-center gap-6 text-sm">
              <a href="#early-access" className="text-foreground hover:underline underline-offset-4">
                See it on your stack
              </a>
              <span className="text-border">|</span>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground">
                How the loop works
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
