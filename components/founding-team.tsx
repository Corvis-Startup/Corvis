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

      <button
        onClick={() => setOpen(!open)}
        className="group inline-flex items-center gap-1.5 font-[family-name:var(--font-space-grotesk)] text-sm font-medium tracking-[0.03em] text-foreground hover:text-foreground/70 transition-colors"
        aria-expanded={open}
      >
        <span
          className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
            open ? "opacity-0 max-w-0" : "opacity-100 max-w-[8rem]"
          }`}
        >
          Founding team
        </span>
        <Plus
          className={`w-3.5 h-3.5 transition-transform duration-300 ${
            open ? "rotate-45" : "rotate-0"
          }`}
        />
      </button>
    </div>
  );
}
