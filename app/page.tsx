import { HeroSection } from "@/components/landing/hero-section";
import { StatsStrip } from "@/components/stats-strip";
import { FoundingTeam } from "@/components/founding-team";

export default function Home() {
  return (
    <main className="min-h-dvh md:h-dvh flex flex-col md:overflow-hidden">
      {/* Logo, top right */}
      <header className="shrink-0">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between pt-7 pb-2 px-6">
          <img
            src="/corvislogo.png"
            alt="Corvis"
            className="h-12 w-auto"
          />
          <FoundingTeam />
        </div>
      </header>

      <HeroSection />
      <StatsStrip />
    </main>
  );
}
