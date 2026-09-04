import React, { useState } from "react";
import ProjectCard, { themeForProject } from "./ProjectCard";
import EmptyState from "../../../components/common/EmptyState";

// Renders the grid of project cards and owns which card is currently
// flipped (UI-only state, doesn't belong on the page or in the API layer).
//
// Responsive columns:
//   mobile   (<640px)  -> 1 column
//   tablet   (640-1023) -> 2 columns
//   laptop   (1024-1279) -> 3 columns
//   desktop  (>=1280)   -> 4 columns
const ProjectList = ({ projects }) => {
  const [flippedIds, setFlippedIds] = useState(() => new Set());

  if (projects.length === 0) {
    return <EmptyState message="No projects match your search." />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={{ ...project, theme: themeForProject(index) }}
          flipped={flippedIds.has(project.id)}
          onFlip={() =>
            setFlippedIds((prev) => new Set(prev).add(project.id))
          }
          onFlipBack={() =>
            setFlippedIds((prev) => {
              const next = new Set(prev);
              next.delete(project.id);
              return next;
            })
          }
        />
      ))}
    </div>
  );
};

export default ProjectList;