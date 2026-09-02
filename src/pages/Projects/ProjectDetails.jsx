import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Users, BookOpen, Gem, Clock3, Zap, ArrowRight } from "lucide-react";
import Loader from "../../components/common/Loader";
import ErrorState from "../../components/common/ErrorState";
import ProjectHeader, { SprintStatusPill } from "../../features/project/components/ProjectHeader";
import FeatureList from "../../features/feature/components/FeatureList";
import UserStoryTable from "../../features/user-story/components/UserStoryTable";
import { fetchProjectById } from "../../features/project/projectApi";

// Small icon+number+label tile for the stats row. Kept local to this page
// (same pattern as the StatTile on the Projects list page) since it's only
// used here.
const StatTile = ({ icon: Icon, iconBg = "bg-slate-900", value, label }) => (
  <div className="bg-white rounded-2xl shadow-sm px-4 py-4 flex items-center gap-3 min-w-0">
    <div className={`${iconBg} rounded-xl w-10 h-10 flex items-center justify-center shrink-0`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div className="min-w-0">
      <div className="text-xl font-bold text-slate-900 leading-tight">{value}</div>
      <div className="text-xs text-slate-500 truncate">{label}</div>
    </div>
  </div>
);

// Circular progress ring built with plain SVG (no extra dependency needed).
const ProgressRing = ({ percent, size = 88, stroke = 8 }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#ede9fe" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke="#7c3aed" strokeWidth={stroke} fill="none"
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-slate-900">
        {percent}%
      </div>
    </div>
  );
};

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null); // null = loading
  const [error, setError] = useState(null);

  const loadProject = () => {
    setProject(null);
    setError(null);
    fetchProjectById(id)
      .then(setProject)
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    loadProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#eef0f7] p-6 md:p-10">
        <ErrorState message={`Couldn't load this project: ${error}`} onRetry={loadProject} />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#eef0f7] p-6 md:p-10">
        <Loader label="Loading project…" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eef0f7] p-6 md:p-10">
      <div className="w-full space-y-6">
        {/* Breadcrumb */}
        <div className="text-sm text-slate-500">
          <Link to="/projects" className="hover:text-slate-700 font-medium">Projects</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 font-semibold">{project.name}</span>
        </div>

        {/* Sprint journey hero */}
        <ProjectHeader projectName={project.name} sprints={project.sprints} />

        {/* Overview card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-slate-900">{project.name}</h2>
            <p className="text-slate-500 mt-2 leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                {project.status === "Active" ? "In Progress" : project.status}
              </span>
              <span className="bg-slate-100 text-slate-600 text-xs font-mono px-3 py-1.5 rounded-full">
                {project.dateRangeLabel}
              </span>
              <span className="bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                {project.sprintsDoneLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <ProgressRing percent={project.overallProgress} />
            <div>
              <p className="font-bold text-slate-900">Overall Progress</p>
              <p className="text-sm text-slate-500">{project.sprintsDoneLabel}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <button
              type="button"
              className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold flex items-center gap-2 hover:bg-slate-200 transition"
            >
              <Zap className="w-4 h-4" />
              Auto-Calculate Dates
            </button>
            <button
              type="button"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold flex items-center gap-2 hover:opacity-95 transition"
            >
              Open Sprint Manager
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <StatTile icon={Gem} iconBg="bg-violet-600" value={project.stats.sprints} label="Sprints" />
          <StatTile icon={BookOpen} iconBg="bg-blue-500" value={project.stats.userStories} label="User Stories" />
          <StatTile icon={Zap} iconBg="bg-orange-500" value={project.stats.storyPoints} label="Story Points" />
          <StatTile icon={Clock3} iconBg="bg-pink-500" value={`${project.stats.effortHours}h`} label="Effort Hours" />
          <StatTile icon={Users} iconBg="bg-emerald-500" value={project.stats.teamMembers} label="Team Members" />
        </div>

        {/* Sprint timeline table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Sprint Timeline</h2>
            <span className="text-xs text-slate-400 font-medium">detailed</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="text-left text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                  <th className="px-5 py-2">#</th>
                  <th className="px-3 py-2">Sprint Name</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Start Date</th>
                  <th className="px-3 py-2">End Date</th>
                  <th className="px-3 py-2">Days</th>
                  <th className="px-3 py-2">Stories</th>
                  <th className="px-3 py-2">Points</th>
                  <th className="px-3 py-2">% Done</th>
                </tr>
              </thead>
              <tbody>
                {project.sprints.map((sprint) => (
                  <tr key={sprint.id} className="border-t border-slate-100">
                    <td className="px-5 py-3 text-slate-500">{sprint.number}</td>
                    <td className="px-3 py-3 font-semibold text-slate-800">{sprint.name}</td>
                    <td className="px-3 py-3"><SprintStatusPill status={sprint.status} /></td>
                    <td className="px-3 py-3 text-slate-500">{sprint.startDate}</td>
                    <td className="px-3 py-3 text-slate-500">{sprint.endDate}</td>
                    <td className="px-3 py-3 text-slate-500">{sprint.days}d</td>
                    <td className="px-3 py-3 text-slate-500">{sprint.stories}</td>
                    <td className="px-3 py-3 text-slate-500">{sprint.points}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${sprint.status === "Completed" ? "bg-emerald-500" : "bg-blue-500"}`}
                            style={{ width: `${sprint.percentDone}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-600">{sprint.percentDone}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Epics */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-base font-bold text-slate-900">Epics</h2>
            <span className="text-sm text-slate-400">{project.epics.length}</span>
          </div>
          <FeatureList features={project.epics} />
        </div>

        {/* Team */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-base font-bold text-slate-900">Team</h2>
            <span className="text-sm text-slate-400">{project.team.length} members</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {project.team.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center">
                    {member.initials}
                  </span>
                  <div>
                    <p className="font-bold text-slate-900">{member.name}</p>
                    <p className="text-sm text-slate-500">{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-500 mt-4">
                  <span>{member.stories} {member.stories === 1 ? "story" : "stories"}</span>
                  <span>{member.hoursPerDay}h/day</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {member.skills.map((skill) => (
                    <span key={skill} className="bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User stories */}
        <UserStoryTable stories={project.userStories} />

        {/* CTA banner */}
        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-lg">Ready to manage sprints?</h3>
            <p className="text-indigo-100 text-sm mt-1">Set your sprint dates above, then open the Sprint Manager to track progress.</p>
          </div>
          <button
            type="button"
            className="bg-white text-indigo-700 font-semibold px-5 py-3 rounded-xl flex items-center gap-2 shrink-0 hover:bg-indigo-50 transition"
          >
            Open Sprint Manager
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;