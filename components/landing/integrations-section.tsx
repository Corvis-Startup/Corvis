"use client";

import { useEffect, useState, useRef } from "react";

const integrations = [
  { name: "GitHub", category: "Commits, PRs, reviews" },
  { name: "Slack", category: "Threads & tribal fixes" },
  { name: "Linear", category: "Issues & resolutions" },
  { name: "Jira", category: "Tickets & history" },
  { name: "CI/CD", category: "Deploy & churn history" },
  { name: "Claude Code", category: "Personal AI history" },
  { name: "Cursor", category: "Agentic workflows" },
  { name: "ChatGPT", category: "Prompt libraries" },
  { name: "GitHub Actions", category: "Pipelines" },
  { name: "PagerDuty", category: "Incidents & on-call" },
  { name: "Notion", category: "Runbooks & docs" },
  { name: "Terraform", category: "Infra state" },
];

export function IntegrationsSection() {
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
    <section id="integrations" ref={sectionRef} className="relative py-24 border-b border-border">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center max-w-[720px] mx-auto mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="eyebrow block mb-6">Ingest</span>
          <h2 className="text-[2rem] lg:text-[2.5rem] font-semibold tracking-[-0.02em] leading-[1.15] text-balance mb-6">
            The full operational
            <br />
            footprint. Not a summary.
          </h2>
          <p className="text-base text-muted-foreground leading-[1.7] text-pretty">
            Corvis reconstructs how an engineer actually worked by pulling from every system
            they touched, including the personal AI tools no exit process ever reaches.
          </p>
        </div>

        {/* Integration grid */}
        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border border border-border rounded-[2px] transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="bg-background p-6 hover:bg-secondary transition-colors duration-300"
            >
              <div className="text-[15px] font-medium text-foreground">{integration.name}</div>
              <div className="text-[13px] text-faint mt-1">{integration.category}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
