// Shared, app-wide constants.
// Keep this file for values used in more than one feature. Values that only
// matter to the project-card visuals (color gradients, etc.) live next to
// that component instead — see features/project/components/ProjectCard.jsx.

export const PROJECT_STATUS = {
  ACTIVE: "Active",
  ARCHIVED: "Archived",
};

// Tabs shown on the Projects page filter control.
export const PROJECT_FILTERS = ["All", PROJECT_STATUS.ACTIVE, PROJECT_STATUS.ARCHIVED];