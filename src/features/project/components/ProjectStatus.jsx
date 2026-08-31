import React from "react";
import { PROJECT_STATUS } from "../../../utils/constants";

// Small status pill shown on project cards ("Active" / "Archived").
// Lives under features/project because the styling (white/translucent on a
// gradient background) is specific to how project status is shown here —
// if you later need a status pill elsewhere with different styling, keep
// this one project-specific and make a separate common one.
const ProjectStatus = ({ status }) => {
  const isActive = status === PROJECT_STATUS.ACTIVE;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
        isActive ? "bg-white/25 text-white" : "bg-white/15 text-white/80"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isActive ? "bg-emerald-300" : "bg-white/60"
        }`}
      />
      {isActive ? PROJECT_STATUS.ACTIVE : PROJECT_STATUS.ARCHIVED}
    </span>
  );
};

export default ProjectStatus;