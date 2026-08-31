export const SECTIONS = [
  {
    id: "cadence",
    title: "Sprint & Cadence Setup",
    subtitle: "Define how often your team ships and plans work.",
    essential: true,
    fields: [
      {
        key: "sprintLength",
        type: "pills",
        label: "Sprint Length",
        options: [
          { v: "1w", l: "1 week" },
          { v: "2w", l: "2 weeks", rec: true },
          { v: "3w", l: "3 weeks" },
          { v: "4w", l: "4 weeks" },
        ],
        default: "2w",
      },
      {
        key: "startDay",
        type: "select",
        label: "Sprint Start Day",
        options: [
          { v: "monday", l: "Monday" },
          { v: "tuesday", l: "Tuesday" },
          { v: "wednesday", l: "Wednesday" },
        ],
        default: "monday",
      },
      {
        key: "ceremonies",
        type: "checkbox-list",
        label: "Ceremonies to include",
        options: ["Sprint Planning", "Daily Standup", "Backlog Grooming", "Sprint Retro"],
        default: [true, true, false, true],
      },
    ],
  },
  {
    id: "breakdown",
    title: "Story Breakdown",
    subtitle: "Decide how features get split into user stories.",
    essential: true,
    fields: [
      {
        key: "breakdownStyle",
        type: "cards",
        label: "Preferred breakdown style",
        options: [
          { v: "vertical", l: "Vertical slices (end-to-end)" },
          { v: "layer", l: "By layer (FE / BE / DB)" },
          { v: "role", l: "By role (Dev / QA / Design)" },
          { v: "auto", l: "Let AI decide", warn: true },
        ],
        default: "vertical",
      },
      {
        key: "maxStoriesPerFeature",
        type: "number",
        label: "Max stories per feature",
        unit: "stories",
        default: "8",
      },
      {
        key: "storyTags",
        type: "chips-multiselect",
        label: "Default tags to attach",
        options: ["Frontend", "Backend", "API", "DB", "UI/UX", "Infra"],
        default: ["Frontend", "Backend"],
      },
    ],
  },
  {
    id: "estimation",
    title: "Estimation & Pointing",
    subtitle: "Choose how effort gets estimated across the team.",
    essential: true,
    fields: [
      {
        key: "pointScale",
        type: "pills",
        label: "Point scale",
        options: [
          { v: "fib", l: "Fibonacci (1,2,3,5,8,13)", rec: true },
          { v: "linear", l: "Linear (1–10)" },
          { v: "tshirt", l: "T-shirt (S/M/L/XL)" },
        ],
        default: "fib",
      },
      {
        key: "autoEstimate",
        type: "cards",
        label: "Who sets the estimate?",
        options: [
          { v: "ai", l: "AI estimates automatically" },
          { v: "team", l: "Team estimates in planning" },
          { v: "hybrid", l: "AI suggests, team confirms" },
        ],
        default: "hybrid",
      },
    ],
  },
  {
    id: "resources",
    title: "Resource Pool & Skills",
    subtitle: "Tell us who's available and what they're good at.",
    essential: false,
    fields: [
      {
        key: "skillTags",
        type: "chips-multiselect",
        label: "Skills present in the team",
        options: [
          "React",
          "Node.js",
          "Python",
          "DevOps",
          "QA",
          "UI/UX",
          "Mobile",
          "Data Engineering",
        ],
        default: ["React", "Node.js"],
      },
      {
        key: "teamSizeBand",
        type: "pills",
        label: "Team size",
        options: [
          { v: "small", l: "2–4" },
          { v: "medium", l: "5–8", rec: true },
          { v: "large", l: "9+" },
        ],
        default: "medium",
      },
    ],
  },
  {
    id: "capacity",
    title: "Capacity & Buffer / Leave",
    subtitle: "Account for holidays, leave, and buffer time.",
    essential: false,
    fields: [
      {
        key: "bufferPercent",
        type: "number",
        label: "Sprint buffer",
        unit: "% of capacity",
        default: "15",
      },
      {
        key: "leaveAware",
        type: "checkbox-list",
        label: "Capacity adjustments",
        options: [
          "Account for public holidays",
          "Account for individual leave",
          "Reduce capacity for new joiners (first sprint)",
        ],
        default: [true, true, false],
      },
    ],
  },
  {
    id: "assignment",
    title: "Assignment & Scheduling",
    subtitle: "Decide how stories get assigned to people.",
    essential: false,
    fields: [
      {
        key: "assignmentMode",
        type: "cards",
        label: "Assignment mode",
        options: [
          { v: "auto", l: "Auto-assign by skill match" },
          { v: "manual", l: "Manual assignment" },
          { v: "volunteer", l: "Team self-picks in planning" },
        ],
        default: "auto",
      },
      {
        key: "scheduleAhead",
        type: "select",
        label: "Plan how many sprints ahead?",
        options: [
          { v: "1", l: "1 sprint" },
          { v: "2", l: "2 sprints" },
          { v: "3", l: "3 sprints" },
        ],
        default: "1",
      },
    ],
  },
  {
    id: "governance",
    title: "Governance Gates",
    subtitle: "Set approval checkpoints before work moves forward.",
    essential: false,
    fields: [
      {
        key: "gates",
        type: "checkbox-list",
        label: "Require sign-off before moving to next stage",
        options: [
          "Feature review approval",
          "User story review approval",
          "Acceptance criteria approval",
          "Final consolidation approval",
        ],
        default: [true, true, true, false],
      },
    ],
  },
];

export function getDefaultAnswers() {
  const answers = {};
  SECTIONS.forEach((section) => {
    section.fields.forEach((field) => {
      answers[field.key] = field.default;
    });
  });
  return answers;
}

export function isSectionComplete(section, answers) {
  return section.fields.every((field) => {
    const v = answers[field.key];
    if (Array.isArray(v)) return v.length > 0;
    return v !== "" && v !== undefined && v !== null;
  });
}