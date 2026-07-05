"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const founders = [
  { name: "Aadit Shah", url: "https://www.linkedin.com/in/aaditshahh/" },
  { name: "Ayaan Sarfraz", url: "https://www.linkedin.com/in/ayaan-sarfraz/" },
  { name: "Baldeep Pannu", url: "https://www.linkedin.com/in/baldeep06/" },
  {
    name: "Shahvir Wahab",
    url: "https://www.linkedin.com/in/shahvir-wahab-744a58247/",
  },
];

export function FoundingTeam() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex items-center gap-8">
      {/* Inline names — desktop */}
      <div className="hidden md:flex items-center gap-8">
        {founders.map((person, i) => (
          <a
            key={person.name}
            href={person.url}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
            className={`font-[family-name:var(--font-space-grotesk)] text-sm font-medium tracking-[0.03em] text-foreground hover:text-foreground/70 transition-all duration-300 ${
              open
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-3 pointer-events-none"
            }`}
            style={{
              transitionDelay: open
                ? `${(founders.length - 1 - i) * 60}ms`
                : `${i * 40}ms`,
            }}
          >
            {person.name}
          </a>
        ))}
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="group inline-flex items-center gap-1.5 font-[family-name:var(--font-space-grotesk)] text-sm font-medium tracking-[0.03em] text-foreground hover:text-foreground/70 transition-colors"
        aria-expanded={open}
      >
        <span
          className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
            open ? "md:opacity-0 md:max-w-0" : ""
          } opacity-100 max-w-[8rem]`}
        >
          Founding team
        </span>
        <Plus
          className={`w-3.5 h-3.5 transition-transform duration-300 ${
            open ? "rotate-45" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown names — mobile */}
      <div
        className={`md:hidden absolute right-0 top-full mt-3 z-20 flex flex-col items-end gap-3 border border-border bg-background/95 backdrop-blur-sm rounded-[2px] px-5 py-4 transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        {founders.map((person, i) => (
          <a
            key={person.name}
            href={person.url}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
            className={`font-[family-name:var(--font-space-grotesk)] text-sm font-medium tracking-[0.03em] text-foreground hover:text-foreground/70 whitespace-nowrap transition-all duration-300 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
            }`}
            style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
          >
            {person.name}
          </a>
        ))}
      </div>
    </div>
  );
}
