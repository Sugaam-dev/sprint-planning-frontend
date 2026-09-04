import React from "react";
import { useNavigate } from "react-router-dom";
import { Folder, ArrowRight } from "lucide-react";
import ProjectStatus from "./ProjectStatus";

// Color themes cycled per card position. This is purely presentational and
// deliberately NOT part of the data model — your backend will never return
// gradient colors, so this stays a frontend-only concern.
export const PROJECT_CARD_THEMES = [
  { gradient: "from-indigo-600 to-violet-600", badgeBg: "bg-indigo-100", badgeText: "text-indigo-700", bar: "bg-gradient-to-r from-indigo-600 to-violet-600" },
  { gradient: "from-pink-600 to-rose-600", badgeBg: "bg-pink-100", badgeText: "text-pink-700", bar: "bg-gradient-to-r from-pink-600 to-rose-600" },
  { gradient: "from-orange-500 to-amber-500", badgeBg: "bg-orange-100", badgeText: "text-orange-700", bar: "bg-gradient-to-r from-orange-500 to-amber-500" },
  { gradient: "from-blue-600 to-cyan-500", badgeBg: "bg-blue-100", badgeText: "text-blue-700", bar: "bg-gradient-to-r from-blue-600 to-cyan-500" },
  { gradient: "from-emerald-600 to-green-500", badgeBg: "bg-emerald-100", badgeText: "text-emerald-700", bar: "bg-gradient-to-r from-emerald-600 to-green-500" },
  { gradient: "from-purple-600 to-fuchsia-600", badgeBg: "bg-purple-100", badgeText: "text-purple-700", bar: "bg-gradient-to-r from-purple-600 to-fuchsia-600" },
];

export function themeForProject(index) {
  return PROJECT_CARD_THEMES[index % PROJECT_CARD_THEMES.length];
}

// Flip card: front shows name + status, back shows description/stats/CTA.
// `project` must already have a `theme` attached (see ProjectList.jsx).
const ProjectCard = ({ project, flipped, onFlip, onFlipBack }) => {
  const navigate = useNavigate();
  const { theme } = project;

  // Arbitrary-value classes like [transform-style:preserve-3d] need a JIT
  // config this project may not have set up yet, so the 3D flip uses plain
  // inline styles instead of Tailwind utilities for the transform itself.
  const sceneStyle = { perspective: "1200px" };
  // Card height scales down on narrow screens so cards aren't too tall/thin
  // on phones, and grows back up on laptop/desktop.
  const cardHeightClass = "h-[400px] sm:h-[400px] lg:h-[410px] xl:h-[420px]";
  const flipperStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    transition: "transform 0.5s",
    transformStyle: "preserve-3d",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
  };
  const faceStyle = {
    position: "absolute",
    inset: 0,
    WebkitBackfaceVisibility: "hidden",
    backfaceVisibility: "hidden",
  };
  const backFaceStyle = { ...faceStyle, transform: "rotateY(180deg)" };

  return (
    <div style={sceneStyle} className={cardHeightClass}>
      <div style={flipperStyle}>
        {/* FRONT */}
        <button
          type="button"
          onClick={onFlip}
          style={faceStyle}
          className={`rounded-2xl shadow-md bg-gradient-to-br ${theme.gradient} p-4 sm:p-6 flex flex-col text-left overflow-hidden w-full h-full`}
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_1px)] bg-[length:16px_16px]" />
          <div className="relative flex items-start justify-between">
            <span className="text-[11px] font-semibold tracking-widest text-white/80 uppercase">
              Project details
            </span>
            <ProjectStatus status={project.status} />
          </div>

          <div className="relative flex-1 flex flex-col items-center justify-center gap-5 px-2">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <Folder className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-base sm:text-xl font-bold text-white text-center leading-snug">
              {project.name}
            </h3>
          </div>

          <div className="relative text-center text-sm text-white/70 font-medium">
            tap to reveal details →
          </div>
        </button>

        {/* BACK */}
        <div
          style={backFaceStyle}
          className="rounded-2xl shadow-md bg-white flex flex-col overflow-hidden w-full h-full"
        >
          <div className={`bg-gradient-to-br ${theme.gradient} px-4 sm:px-5 py-3 sm:py-4 min-h-[80px] sm:min-h-[92px] flex flex-col justify-center`}>
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-semibold tracking-widest text-white/80 uppercase">
                Project details
              </span>
              <ProjectStatus status={project.status} />
            </div>
            <h3 className="text-base font-bold text-white mt-2 leading-snug line-clamp-2">
              {project.name}
            </h3>
          </div>

          <div className="flex-1 flex flex-col px-4 sm:px-5 py-3 sm:py-4 min-h-0">
            <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 sm:line-clamp-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              <span className={`${theme.badgeBg} ${theme.badgeText} text-xs font-semibold px-3 py-1.5 rounded-full`}>
                {project.sprints} sprints
              </span>
              <span className={`${theme.badgeBg} ${theme.badgeText} text-xs font-semibold px-3 py-1.5 rounded-full`}>
                {project.stories} stories
              </span>
              <span className={`${theme.badgeBg} ${theme.badgeText} text-xs font-semibold px-3 py-1.5 rounded-full`}>
                {project.points} pts
              </span>
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                  Overall progress
                </span>
                <span className={`text-sm font-bold ${theme.badgeText}`}>
                  {project.progress}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className={`h-full rounded-full ${theme.bar}`} style={{ width: `${project.progress}%` }} />
              </div>
            </div>

            <div className="mt-auto pt-3">
              <button
                type="button"
                onClick={() => navigate(`/projects/${project.id}`)}
                className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white bg-gradient-to-r ${theme.gradient} shadow-sm hover:opacity-95 transition`}
              >
                Open Project
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onFlipBack}
                className="w-full text-center text-xs text-slate-400 hover:text-slate-600 mt-2 font-medium"
              >
                ← flip back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;