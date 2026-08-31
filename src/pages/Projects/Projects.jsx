import React, { useEffect, useMemo, useState } from "react";
import { Folder, Zap, RefreshCw, Columns3 } from "lucide-react";
import SearchInput from "../../components/common/SearchInput";
import Loader from "../../components/common/Loader";
import ErrorState from "../../components/common/ErrorState";
import ProjectList from "../../features/project/components/ProjectList";
import { fetchProjects } from "../../features/project/projectApi";
import { PROJECT_FILTERS, PROJECT_STATUS } from "../../utils/constants";

// Small stats-row card (icon + number + label). Kept local to this page
// instead of its own file in components/common — it's only used here, in
// the four-tile row at the top of the Projects page.
const StatTile = ({ icon: Icon, iconBg = "bg-slate-900", value, label }) => (
  <div className="bg-white rounded-2xl shadow-sm px-3 py-4 sm:px-6 sm:py-5 flex items-center gap-2 sm:gap-4 min-w-0">
    <div className={`${iconBg} rounded-xl w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center shrink-0`}>
      <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
    </div>
    <div className="min-w-0">
      <div className="text-lg sm:text-2xl font-bold text-slate-900 leading-tight">{value}</div>
      <div className="text-xs sm:text-sm text-slate-500 truncate">{label}</div>
    </div>
  </div>
);

// Page for the "/projects" route. Owns data fetching (via projectApi) and
// the search/filter state; delegates rendering of the cards themselves to
// ProjectList so this file stays focused on page-level concerns.
const Projects = () => {
  const [projects, setProjects] = useState(null); // null = loading
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const loadProjects = () => {
    setProjects(null);
    setError(null);
    fetchProjects()
      .then(setProjects)
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const filtered = useMemo(() => {
    if (!projects) return [];
    return projects.filter((p) => {
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter === "All" ? true : p.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [projects, query, filter]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#eef0f7] p-6 md:p-10">
        <ErrorState message={`Couldn't load projects: ${error}`} onRetry={loadProjects} />
      </div>
    );
  }

  if (!projects) {
    return (
      <div className="min-h-screen bg-[#eef0f7] p-6 md:p-10">
        <Loader label="Loading projects…" />
      </div>
    );
  }

  const totalActive = projects.filter((p) => p.status === PROJECT_STATUS.ACTIVE).length;
  const totalSprints = projects.reduce((sum, p) => sum + p.sprints, 0);
  const totalStories = projects.reduce((sum, p) => sum + p.stories, 0);

  return (
    <div className="min-h-screen bg-[#eef0f7] p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          <StatTile icon={Folder} iconBg="bg-slate-900" value={projects.length} label="Total Projects" />
          <StatTile icon={Zap} iconBg="bg-orange-500" value={totalActive} label="Active" />
          <StatTile icon={RefreshCw} iconBg="bg-blue-500" value={totalSprints} label="Total Sprints" />
          <StatTile icon={Columns3} iconBg="bg-slate-900" value={totalStories} label="Total Stories" />
        </div>

        {/* Search + filter row */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
          />

          <div className="flex items-center flex-wrap bg-white rounded-2xl p-1 shadow-sm shrink-0">
            {PROJECT_FILTERS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                  filter === tab ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="text-sm text-slate-400 font-medium shrink-0 px-1">
            {filtered.length} of {projects.length} cards
          </div>
        </div>

        <ProjectList projects={filtered} />
      </div>
    </div>
  );
};

export default Projects;