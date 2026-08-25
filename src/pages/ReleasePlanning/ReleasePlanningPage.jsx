import Hero from "../../features/releasePlanning/components/Hero";
import ProjectBasicsCard from "../../features/releasePlanning/components/ProjectBasicsCard";
import TeamCard from "../../features/releasePlanning/components/TeamCard";
import StoryPreviewCard from "../../features/releasePlanning/components/StoryPreviewCard";
import LeavePlanCard from "../../features/releasePlanning/components/LeavePlanCard";

export default function ReleasePlanningPage() {
  return (
    <div className="min-h-screen bg-[#f1f0f6]">
      <header className="bg-white border-b-2 border-[#e4e2ee] px-11 py-5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5b4fe9] to-[#e0479e] flex items-center justify-center text-white font-semibold text-base">
            P
          </div>
          <div className="leading-tight">
            <b className="block text-[15px]">PMRG Solution</b>
            <span className="text-[10.5px] text-[#6c7086] tracking-widest">SPRINT PLANNING</span>
          </div>
        </div>
        <div className="text-[13px] text-[#6c7086]">
          <b className="text-[#161a2e] font-semibold">Release Planning</b> · new project
        </div>
      </header>

      <main className="max-w-[1180px] mx-auto px-8 py-11 pb-20">
        <div
          className="opacity-0"
          style={{ animation: "fadeInUp 0.7s ease forwards" }}
        >
          <Hero />
        </div>

        <div
          className="flex items-baseline gap-3 my-5 opacity-0"
          style={{ animation: "fadeInUp 0.7s ease forwards 0.15s" }}
        >
          <h2 className="text-xl font-semibold">Project details</h2>
          <span className="text-[12.5px] text-[#6c7086]">
            — fill in what applies, then generate above
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div
            id="basics"
            className="opacity-0 transition-transform duration-300 hover:-translate-y-1"
            style={{ animation: "fadeInUp 0.7s ease forwards 0.2s" }}
          >
            <ProjectBasicsCard />
          </div>
          <div
            className="opacity-0 transition-transform duration-300 hover:-translate-y-1"
            style={{ animation: "fadeInUp 0.7s ease forwards 0.3s" }}
          >
            <TeamCard />
          </div>
          <div
            className="opacity-0 transition-transform duration-300 hover:-translate-y-1"
            style={{ animation: "fadeInUp 0.7s ease forwards 0.4s" }}
          >
            <StoryPreviewCard />
          </div>
          <div
            className="opacity-0 transition-transform duration-300 hover:-translate-y-1"
            style={{ animation: "fadeInUp 0.7s ease forwards 0.5s" }}
          >
            <LeavePlanCard />
          </div>
        </div>

        <div
          className="mt-10 flex items-center justify-between bg-white border-2 border-[#e4e2ee] rounded-[22px] px-8 py-6 opacity-0"
          style={{ animation: "fadeInUp 0.7s ease forwards 0.6s" }}
        >
          <div>
            <b className="block text-[15px]">All set?</b>
            <span className="text-[13px] text-[#6c7086]">
              Generate a full backlog from what you've filled in above.
            </span>
          </div>
          <button
            className="bg-[#ffb020] text-[#241a03] rounded-xl px-8 py-4 text-base font-bold hover:brightness-95 transition"
            style={{ animation: "pulseGlow 2.2s ease-in-out infinite" }}
          >
            Generate Stories ⚡
          </button>
        </div>
      </main>

      <footer className="text-center text-[12px] text-[#6c7086] py-8">
        © 2026 PMRG Solution · Sprint planning made easy
      </footer>
    </div>
  );
}