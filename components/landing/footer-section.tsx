"use client";

import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  Product: [
    { name: "The problem", href: "#problem" },
    { name: "How it works", href: "#how-it-works" },
    { name: "Why Nomos", href: "#differentiator" },
    { name: "Memory layer", href: "#memory-layer" },
  ],
  Platform: [
    { name: "Ingest sources", href: "#integrations" },
    { name: "Backtesting", href: "#how-it-works" },
    { name: "Slack bot", href: "#memory-layer" },
    { name: "Runnable workflows", href: "#memory-layer" },
  ],
  Company: [
    { name: "Who it's for", href: "#use-cases" },
    { name: "Early access", href: "#early-access", badge: "Open" },
    { name: "Contact", href: "#early-access" },
  ],
  Legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Security", href: "#" },
  ],
};

const socialLinks = [
  { name: "Twitter", href: "#" },
  { name: "GitHub", href: "#" },
  { name: "LinkedIn", href: "#" },
];

export function FooterSection() {
  return (
    <footer className="relative border-t border-border bg-card">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Main Footer */}
        <div className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <a href="#" className="inline-flex items-center gap-2 mb-6">
                <span className="text-lg font-semibold tracking-[-0.02em]">Nomos</span>
                <span className="text-[11px] text-faint">memory layer</span>
              </a>

              <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-xs text-pretty">
                Turn engineering offboarding into executable company memory. Backtested,
                evidenced, and runnable, so knowledge doesn&apos;t leave when people do.
              </p>

              {/* Social Links */}
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="eyebrow mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                        {"badge" in link && link.badge && (
                          <span className="text-xs px-2 py-0.5 bg-foreground text-background rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Nomos. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-foreground/30" />
              Pre-launch · onboarding design partners
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
