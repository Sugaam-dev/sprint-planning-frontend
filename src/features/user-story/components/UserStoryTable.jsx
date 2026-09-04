import React, { useMemo, useState } from "react";
import { CheckCircle2, PlayCircle, Circle, ChevronDown, BookOpen } from "lucide-react";

const PRIORITY_STYLES = {
  Critical: "bg-white border border-slate-900 text-slate-900",
  High: "bg-red-100 text-red-600",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-slate-100 text-slate-500",
};

const STATUS_CONFIG = {
  "In Progress": { style: "bg-blue-50 border border-blue-200 text-blue-600", icon: PlayCircle },
  Done: { style: "bg-emerald-50 border border-emerald-200 text-emerald-600", icon: CheckCircle2 },
  "To Do": { style: "bg-white border border-slate-200 text-slate-500", icon: Circle },
};

const PriorityBadge = ({ priority }) => (
  <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md ${PRIORITY_STYLES[priority] || PRIORITY_STYLES.Low}`}>
    {priority}
  </span>
);

const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG["To Do"];
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${config.style}`}>
      <Icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
};

// Renders a flat `stories` array as a table grouped by epic, matching the
// shape produced by projectApi.js (each story carries epicId + epicTitle).
const UserStoryTable = ({ stories }) => {
  // Whole section collapses/expands via this header — the epic sub-groups
  // beneath it are always expanded together (no per-group toggle).
  const [isOpen, setIsOpen] = useState(true);

  const grouped = useMemo(() => {
    const map = new Map();
    stories.forEach((story) => {
      if (!map.has(story.epicId)) {
        map.set(story.epicId, { epicId: story.epicId, epicTitle: story.epicTitle, stories: [] });
      }
      map.get(story.epicId).stories.push(story);
    });
    return Array.from(map.values());
  }, [stories]);

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-2 px-5 py-4 border-b border-slate-100 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-inset"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-900">User Stories ({stories.length})</h2>
          <span className="text-sm text-slate-400">&mdash; grouped by epic</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? "" : "-rotate-180"}`} />
      </button>

      {isOpen && grouped.map((group) => (
        <div key={group.epicId}>
          <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-100">
            <span className="font-semibold text-slate-700 text-sm">{group.epicTitle}</span>
            <span className="text-xs text-slate-400">{group.stories.length} stories</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="text-left text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                  <th className="px-5 py-2 font-semibold">Story</th>
                  <th className="px-3 py-2 font-semibold">Sprint</th>
                  <th className="px-3 py-2 font-semibold">Priority</th>
                  <th className="px-3 py-2 font-semibold">Pts</th>
                  <th className="px-3 py-2 font-semibold">Hours</th>
                  <th className="px-3 py-2 font-semibold">Assigned To</th>
                  <th className="px-3 py-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {group.stories.map((story) => (
                  <tr key={story.id} className="border-t border-slate-100">
                    <td className="px-5 py-3 max-w-xs">
                      <p className="font-semibold text-slate-800">{story.title}</p>
                      <p className="text-slate-400 text-xs mt-0.5 truncate">{story.description}</p>
                    </td>
                    <td className="px-3 py-3 text-slate-500 whitespace-nowrap">{story.sprint}</td>
                    <td className="px-3 py-3"><PriorityBadge priority={story.priority} /></td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{story.points}</td>
                    <td className="px-3 py-3 text-slate-500">{story.hours}h</td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-2 text-slate-700">
                        <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                          {story.assignee.initials}
                        </span>
                        {story.assignee.name}
                      </span>
                    </td>
                    <td className="px-3 py-3"><StatusBadge status={story.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStoryTable;