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
  title: "Story Breakdown & Architecture Strategy",
  subtitle: "Configure how work items are broken down and structured.",
  essential: true,
  fields: [
    {
      key: "breakdownApproach",
      type: "select",
      label: "Story Breakdown Approach",
      options: [
        { v: "vertical", l: "Vertical Slicing (Recommended)" },
        { v: "spidr", l: "SPIDR Method" },
        { v: "role", l: "Role / Workflow-based" },
        { v: "horizontal", l: "Horizontal Layering" },
      ],
      default: "vertical",
    },
    {
      key: "structurePolicy",
      type: "select",
      label: "Story Structure Policy",
      options: [
        { v: "single", l: "Single Direct Task" },
        { v: "subtasks", l: "Collection of Sub-Tasks (Recommended)" },
      ],
      default: "subtasks",
    },
    {
      key: "maxSp",
      type: "select",
      label: "Max Story Point Threshold",
      options: [
        { v: "5", l: "5 SP" },
        { v: "8", l: "8 SP" },
        { v: "13", l: "13 SP" },
      ],
      default: "8",
    },
    {
      key: "docRules",
      type: "toggle-rows",
      options: [
        { k: "lld", l: "LLD / Architecture Required", options: ["Required", "Optional"] },
        { k: "qa", l: "QA Test Scenarios Required", options: ["Required", "Optional"] },
      ],
      default: { lld: "Optional", qa: "Optional" },
    },
    {
      key: "subtaskTemplate",
      type: "checkbox-list",
      label: "Mandatory sub-task template",
      options: [
        "Architecture & technical design",
        "API / database implementation",
        "UI / component integration",
        "Unit & integration test suite",
        "QA manual & automation verification",
        "Security / InfoSec review",
      ],
      default: [true, true, true, true, true, false],
    },
  ],
},
  {
  id: "estimation",
  title: "Estimation & Story Pointing Mapping",
  subtitle: "Calibrate story points with real world effort and estimation framework.",
  essential: true,
  fields: [
    {
      key: "estFramework",
      type: "cards",
      label: "Estimation Framework",
      options: [
        { v: "fib", l: "Fibonacci (1,2,3,5,8,13,...)" },
        { v: "mfib", l: "Modified Fibonacci" },
        { v: "tshirt", l: "T-shirt Sizing" },
        { v: "hours", l: "Direct Ideal Engineering Hours" },
      ],
      default: "fib",
    },
    {
      key: "calibration",
      type: "calibration-info",
      label: "Story point calibration",
    },
    {
      key: "velocity",
      type: "number",
      label: "Historical Velocity Baseline (SP / Sprint)",
      placeholder: "32",
      default: "30",
    },
  ],
},
  {
  id: "resources",
  title: "Resource Pool, Skills & Capability Tagging",
  subtitle: "Define resources, skills, experience levels and daily productive hours.",
  essential: false,
  fields: [
    {
      key: "dailyHours",
      type: "number",
      label: "Standard daily productive hours",
      unit: "hrs / day",
      placeholder: "6",
      default: "6",
    },
    {
      key: "skillTags",
      type: "chips-multiselect",
      label: "Resource skill tag taxonomy",
      options: [
        "Backend-Python",
        "Backend-Node",
        "Backend-Java",
        "Frontend-React",
        "Frontend-Flutter",
        "DevOps-K8s",
        "QA-Automation",
        "InfoSec",
        "DBA-Postgres",
      ],
      default: ["Backend-Node", "Frontend-React", "QA-Automation", "DBA-Postgres"],
    },
    {
      key: "resources",
      type: "resource-table",
      label: "Resource configuration",
      options: {
        cols: [
          ["name", "Resource"],
          ["role", "Role / Title"],
          ["primary", "Primary skills"],
          ["secondary", "Secondary skills"],
          ["hours", "Daily hrs"],
          ["mult", "Multiplier"],
        ],
      },
      default: [
        ["Pooja V.", "Tech Lead", "Backend-Node, DBA-Postgres", "DevOps-K8s", "4", "1.2×"],
        ["Alex R.", "Senior Dev", "Frontend-Flutter, Frontend-React", "UI/UX", "6", "1.3×"],
        ["Ritu M.", "QA Lead", "QA-Automation, Selenium", "Security", "6", "1.0×"],
        ["Ankit P.", "Backend Dev", "Backend-Python, FastAPI", "Docker", "6", "1.0×"],
      ],
    },
  ],
},
  {
  id: "capacity",
  title: "Capacity Planning, Buffer & Leave Management",
  subtitle: "Manage leaves, holidays, and capacity buffers.",
  essential: false,
  fields: [
    {
      key: "holidays",
      type: "date-list",
      label: "Statutory / public holidays",
      default: ["2025-01-01", "2025-01-26", "2025-08-15", "2025-10-02", "2025-12-25"],
    },
    {
      key: "leaves",
      type: "resource-table",
      label: "Member-specific planned leaves",
      options: {
        cols: [
          ["name", "Resource"],
          ["from", "From"],
          ["to", "To"],
          ["days", "Total days"],
        ],
      },
      default: [
        ["Alex R.", "2025-09-10", "2025-09-14", "5"],
        ["Ritu M.", "2025-10-20", "2025-10-21", "2"],
        ["Ankit P.", "2025-11-05", "2025-11-05", "1"],
      ],
    },
    {
      key: "buffers",
      type: "toggle-rows",
      label: "Buffer & contingency factors",
      options: [
        { k: "prodBuffer", l: "Support / bug-fix buffer", options: ["10%", "15%", "20%"] },
        { k: "contingency", l: "Unplanned task contingency margin", options: ["5%", "10%"] },
      ],
      default: { prodBuffer: "15%", contingency: "5%" },
    },
    {
      key: "capacityFormula",
      type: "formula-info",
      label: "Net available sprint capacity",
    },
  ],
},
  {
  id: "assignment",
  title: "Story-to-Sprint Assignment & Auto-Scheduling Rules",
  subtitle: "Define assignment policies and auto-scheduling preferences.",
  essential: false,
  fields: [
    {
      key: "assignPolicy",
      type: "select",
      label: "Assignment Policy",
      options: [
        { v: "single", l: "Single Assignee per Story" },
        { v: "swarm", l: "Swarming / Multi-assignee" },
      ],
      default: "single",
    },
    {
      key: "skillMatch",
      type: "select",
      label: "Skill Matching",
      options: [
        { v: "exact", l: "100% Exact Match" },
        { v: "adjacent", l: "Allow Adjacent Skills" },
      ],
      default: "adjacent",
    },
    {
      key: "utilCap",
      type: "select",
      label: "Utilization Cap",
      options: [
        { v: "85", l: "85%" },
        { v: "90", l: "90%" },
        { v: "100", l: "100%" },
      ],
      default: "85",
    },
    {
      key: "packingStrategy",
      type: "select",
      label: "Sprint Packing Strategy",
      options: [
        { v: "risk", l: "Risk-first" },
        { v: "mvp", l: "MVP-first" },
        { v: "dependency", l: "Dependency-Optimized" },
      ],
      default: "dependency",
    },
  ],
},
{
  id: "governance",
  title: "Governance Gates & Escalation Triggers",
  subtitle: "Set governance gates, alerts and escalation thresholds.",
  essential: false,
  fields: [
    {
      key: "blockerEscalation",
      type: "select",
      label: "Blocker Escalation",
      options: [
        { v: "48", l: "48 hrs" },
        { v: "72", l: "72 hrs" },
      ],
      default: "48",
    },
    {
      key: "scopeCreep",
      type: "select",
      label: "Scope Creep Alert",
      options: [
        { v: "10", l: "10%" },
        { v: "15", l: "15%" },
      ],
      default: "10",
    },
    {
      key: "qaQueue",
      type: "number-pair",
      label: "QA Queue Warning",
      options: [
        { k: "queue", l: "Max queued stories", unit: "Stories", ph: "8" },
        { k: "wait", l: "Max average wait", unit: "Days", ph: "3" },
      ],
      default: { queue: "8", wait: "3" },
    },
    {
      key: "gates",
      type: "toggle-rows",
      label: "Governance Gates",
      options: [
        { k: "brd", l: "BRD Gate", options: ["Mandatory", "Advisory"] },
        { k: "cost", l: "Cost Gate", options: ["Mandatory", "Advisory"] },
        { k: "infosec", l: "InfoSec Gate", options: ["Mandatory", "Advisory"] },
      ],
      default: { brd: "Mandatory", cost: "Advisory", infosec: "Mandatory" },
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
    if (field.type === "calibration-info" || field.type === "formula-info") return true;
    const v = answers[field.key];
    if (Array.isArray(v)) return v.length > 0;
    return v !== "" && v !== undefined && v !== null;
  });
}