"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  {
    prefix: "$",
    value: 31,
    suffix: "B",
    decimals: 0,
    description:
      "lost annually by Fortune 500 companies from knowledge-sharing failures",
  },
  {
    value: 42,
    suffix: "%",
    decimals: 0,
    description:
      "of institutional knowledge disappears when an employee leaves",
  },
  {
    prefix: "",
    value: 6,
    suffix: " months",
    decimals: 0,
    description:
      "for a replacement engineer to reach full productivity after a senior leaves",
  },
];

const COUNT_DURATION = 1600;
const STAGGER = 200;
const START_DELAY = 600;

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function CountUp({
  prefix,
  value,
  suffix,
  decimals,
  delay,
}: {
  prefix: string;
  value: number;
  suffix: string;
  decimals: number;
  delay: number;
}) {
  const [display, setDisplay] = useState(0);
  const frame = useRef<number>(0);

  useEffect(() => {
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start - delay;
      if (elapsed < 0) {
        frame.current = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / COUNT_DURATION, 1);
      setDisplay(value * easeOutExpo(progress));
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [value, delay]);

  return (
    <span className="tabular-nums">
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function StatsStrip() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="shrink-0 border-t border-border">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
        {stats.map((stat, i) => (
          <div
            key={stat.suffix + stat.value}
            className="group hover:bg-card/70 transition-colors duration-300"
          >
            <div
              className={`px-9 py-9 text-center transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${START_DELAY + i * STAGGER}ms` }}
            >
              <div className="transition-transform duration-300 group-hover:-translate-y-1">
                <p className="text-4xl font-semibold tracking-[-0.02em]">
                  <CountUp
                    prefix={stat.prefix}
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    delay={START_DELAY + i * STAGGER}
                  />
                </p>
                <p className="mt-2.5 text-[15px] text-muted-foreground leading-[1.55] max-w-[320px] mx-auto">
                  {stat.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
