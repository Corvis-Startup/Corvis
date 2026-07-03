"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "The problem", href: "#problem" },
  { name: "How it works", href: "#how-it-works" },
  { name: "Why Corvis", href: "#differentiator" },
  { name: "Memory layer", href: "#memory-layer" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`bg-background border-b transition-colors duration-300 ${
          isScrolled || isMobileMenuOpen ? "border-border" : "border-transparent"
        }`}
      >
        <div className="relative max-w-[1100px] mx-auto flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-[-0.02em]">Corvis</span>
            <span className="text-[11px] text-faint mt-0.5">memory layer</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#early-access"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Request access
            </a>
            <Button size="sm" className="rounded-[2px] h-9 px-4" asChild>
              <a href="#early-access">Book a demo</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 0 }}
      >
        <div className="flex flex-col h-full px-8 pt-28 pb-8">
          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-4xl font-semibold tracking-[-0.02em] text-foreground hover:text-muted-foreground transition-all duration-500 ${
                  isMobileMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms" }}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Bottom CTAs */}
          <div
            className={`flex gap-4 pt-8 border-t border-border transition-all duration-500 ${
              isMobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }}
          >
            <Button
              variant="outline"
              className="flex-1 rounded-[2px] h-12 text-base"
              onClick={() => setIsMobileMenuOpen(false)}
              asChild
            >
              <a href="#early-access">Request access</a>
            </Button>
            <Button
              className="flex-1 rounded-[2px] h-12 text-base"
              onClick={() => setIsMobileMenuOpen(false)}
              asChild
            >
              <a href="#early-access">Book a demo</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
