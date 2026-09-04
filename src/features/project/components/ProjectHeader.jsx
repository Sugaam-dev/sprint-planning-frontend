import React from "react";
import { Check } from "lucide-react";

// Sprint status pill used inside the journey nodes and the sprint table.
// Kept local to this file since its styling (bg/text per status) is only
// used in sprint-journey contexts, not the project Active/Archived pill
// (see ProjectStatus.jsx for that one).
const SPRINT_STATUS_STYLES = {
  Completed: "bg-emerald-100 text-emerald-700",
  "In Progress": "bg-blue-100 text-blue-700",
  "Not Started": "bg-slate-100 text-slate-500",
};

export const SprintStatusPill = ({ status, percentDone }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${SPRINT_STATUS_STYLES[status] || SPRINT_STATUS_STYLES["Not Started"]}`}>
    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
    {status}
    {status === "In Progress" && typeof percentDone === "number" ? ` \u00b7 ${percentDone}%` : ""}
  </span>
);

const NODE_STYLES = {
  Completed: "bg-emerald-500 text-white shadow-[0_0_0_6px_rgba(16,185,129,0.15)]",
  "In Progress": "bg-blue-600 text-white sprint-node-active",
  "Not Started": "bg-transparent text-white/60 border-2 border-white/25",
};

// Scoped CSS for the two animations: a pulsing ring on the currently-active
// sprint node, and a slow drifting glow behind the whole hero card. Kept as
// a plain <style> tag (like a hand-rolled reference version would do)
// rather than a Tailwind config change, so this component stays fully
// self-contained and doesn't require editing tailwind.config anywhere else.
const HERO_STYLES = `
  .sprint-hero { position: relative; overflow: hidden; isolation: isolate; }
  .sprint-hero::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(600px 300px at 80% 110%, rgba(150,90,220,0.35), transparent 70%),
      radial-gradient(500px 260px at 10% 100%, rgba(80,60,200,0.35), transparent 70%);
    animation: sprintHeroGlow 10s ease-in-out infinite alternate;
    z-index: -1;
  }
  @keyframes sprintHeroGlow {
    0% { transform: translate(0,0) scale(1); opacity: 0.9; }
    100% { transform: translate(20px,-10px) scale(1.08); opacity: 1; }
  }
  .sprint-node-active {
    animation: sprintNodePulse 2s ease-out infinite;
  }
  @keyframes sprintNodePulse {
    0% { box-shadow: 0 0 0 0 rgba(61,123,255,0.55); }
    70% { box-shadow: 0 0 0 14px rgba(61,123,255,0); }
    100% { box-shadow: 0 0 0 0 rgba(61,123,255,0); }
  }
`;

const DASHED_LINE_STYLE = {
  backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.32) 0 6px, transparent 6px 14px)",
};

// Dark hero banner showing the sprint-by-sprint journey for a project.
// `sprints` must be an ordered array (see projectApi.js's DETAIL_TEMPLATE).
//
// Layout approach: the connecting track is a SEPARATE absolutely-positioned
// element behind the node grid, pinned to the exact vertical center of the
// 56px circles (top: 27px). This avoids the earlier bug where a flex row's
// `items-center` aligned the track against the tallest column (name + date
// + pill) instead of against the circles themselves.
const ProjectHeader = ({ projectName, sprints }) => {
  // % inset on each side so the track's edges land exactly on the center of
  // the first and last node (each node occupies 1/n of the grid width).
  const insetPercent = 100 / (sprints.length * 2);

  return (
    <div className="sprint-hero rounded-3xl bg-gradient-to-br from-[#1a1033] via-[#2a1854] to-[#1a1033] p-6 md:p-10">
      <style>{HERO_STYLES}</style>

      <p className="text-center text-[11px] font-semibold tracking-[0.3em] text-violet-300 uppercase">
        Sprint Journey
      </p>
      <h1 className="text-center text-2xl md:text-3xl font-bold text-white mt-2">
        {projectName}
      </h1>

      <div className="mt-10 overflow-x-auto py-4">
        <div className="relative min-w-[560px] px-2">
          {/* Track: sits behind the nodes, aligned to their vertical center */}
          <div
            className="absolute top-[27px] flex items-center h-1"
            style={{ left: `${insetPercent}%`, right: `${insetPercent}%` }}
          >
            {sprints.slice(0, -1).map((sprint) => (
              <div
                key={sprint.id}
                className={`flex-1 h-1 rounded-full mx-0.5 ${
                  sprint.status === "Completed" ? "bg-gradient-to-r from-emerald-400 to-blue-500" : ""
                }`}
                style={sprint.status === "Completed" ? undefined : DASHED_LINE_STYLE}
              />
            ))}
          </div>

          {/* Nodes */}
          <div
            className="relative grid gap-4"
            style={{ gridTemplateColumns: `repeat(${sprints.length}, minmax(0, 1fr))` }}
          >
            {sprints.map((sprint) => (
              <div key={sprint.id} className="flex flex-col items-center text-center">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg mb-4 shrink-0 ${NODE_STYLES[sprint.status]}`}
                >
                  {sprint.status === "Completed" ? <Check className="w-6 h-6" /> : sprint.number}
                </div>
                <h3 className="text-sm font-bold text-white leading-snug max-w-[220px]">
                  {sprint.name}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  {sprint.dateRange} &middot; {sprint.days}d
                </p>
                <div className="mt-3">
                  <SprintStatusPill status={sprint.status} percentDone={sprint.percentDone} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400 mt-8">
        &larr; scroll to explore the full journey &rarr;
      </p>
    </div>
  );
};

export default ProjectHeader;