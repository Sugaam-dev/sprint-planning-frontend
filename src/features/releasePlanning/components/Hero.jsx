export default function Hero() {
  return (
    <section className="relative rounded-[28px] p-14 overflow-hidden shadow-[0_24px_60px_-16px_rgba(91,79,233,.45)] mb-10 bg-[linear-gradient(155deg,#161a2e,#241a4d_65%,#161a2e)]">
      {/* soft glow overlay */}
      <div
        className="absolute -top-[120px] left-1/2 -translate-x-1/2 w-[760px] h-[520px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,176,32,.38), transparent 45%), radial-gradient(circle at 70% 15%, rgba(224,71,158,.38), transparent 45%), radial-gradient(circle at 50% 0%, rgba(91,79,233,.4), transparent 55%)",
        }}
      />

      <div className="relative z-10">
        <span
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3 py-1.5 rounded-full mb-4"
          style={{ animation: "badgePulse 1.8s ease-in-out infinite" }}
        >
          ✦ One click backlog
        </span>

        <h1 className="text-white text-3xl md:text-4xl leading-tight max-w-2xl font-semibold">
          Generate your{" "}
          <span className="bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent">
            sprint-ready stories
          </span>{" "}
          in seconds
        </h1>

        <p className="text-[#c7c8dd] text-sm leading-relaxed max-w-xl mt-4">
          Add your project scope, team, and leave plan below — then hit
          Generate. PMRG turns it into a full backlog of user stories mapped
          to your team's skills and availability.
        </p>

        <div className="mt-8 pt-5 border-t border-white/10 flex items-center gap-2 text-xs text-[#9a9bbd]">
          ↓ Start with{" "}
          <a href="#basics" className="text-[#e8e8f7] font-semibold border-b border-dashed border-white/40">
            project scope
          </a>
          , or fill in what you have and generate anytime.
        </div>
      </div>
    </section>
  );
}