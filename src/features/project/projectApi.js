// Project feature API layer.
//
// There's no backend yet, so `fetchProjects` resolves mock data after a
// short simulated delay (so loading states are visible/testable). When the
// real endpoint exists, replace the body of this function with an actual
// call through src/api/client.js — the function signature and shape of the
// data it resolves to (an array of project objects) should stay the same,
// so nothing else in the app needs to change.
//
// Expected shape per project (this is your contract with the backend team):
//   {
//     id: string,
//     name: string,
//     description: string,
//     status: "Active" | "Archived",
//     sprints: number,
//     stories: number,
//     points: number,
//     progress: number,   // 0-100
//   }

const MOCK_PROJECTS = [
  {
    id: "fintech-banking",
    name: "Fintech Mobile Banking & AI Assistant",
    description:
      "Next-gen iOS & Android banking app with real-time budget forecasting, biometric auth, and an AI-powered financial advisor across 12 integrated accounts.",
    status: "Active",
    sprints: 3,
    stories: 12,
    points: 142,
    progress: 33,
  },
  {
    id: "ecommerce-personalization",
    name: "E-Commerce Hyper-Personalization Engine",
    description:
      "Real-time recommendation engine powered by multi-modal vector search and behavioral analytics across a 50M+ product catalog.",
    status: "Active",
    sprints: 2,
    stories: 8,
    points: 98,
    progress: 24,
  },
  {
    id: "healthcare-telemedicine",
    name: "Healthcare Telemedicine Portal v3",
    description:
      "HIPAA-compliant video consultations, automated prescription routing, and EHR integration across 40+ hospital systems.",
    status: "Archived",
    sprints: 4,
    stories: 16,
    points: 160,
    progress: 100,
  },
  {
    id: "logistics-routing",
    name: "Logistics Route Optimization AI",
    description:
      "Reinforcement-learning powered fleet routing that cuts fuel costs and delivery windows across 2,000+ daily routes.",
    status: "Active",
    sprints: 5,
    stories: 20,
    points: 210,
    progress: 62,
  },
  {
    id: "legacy-crm-migration",
    name: "Legacy CRM Migration",
    description:
      "Full data migration and feature parity rebuild moving 1.2M customer records off a 15-year-old on-prem CRM.",
    status: "Archived",
    sprints: 4,
    stories: 18,
    points: 176,
    progress: 100,
  },
  {
    id: "enterprise-analytics",
    name: "Enterprise Analytics Suite",
    description:
      "Self-serve BI platform with governed semantic layer, natural-language querying, and role-based dashboards for 30+ business units.",
    status: "Active",
    sprints: 6,
    stories: 29,
    points: 268,
    progress: 45,
  },
];

export async function fetchProjects() {
  // TODO(backend): replace with e.g. `return apiClient.get("/projects")`
  await new Promise((resolve) => setTimeout(resolve, 400));
  return MOCK_PROJECTS;
}

export async function fetchProjectById(id) {
  // TODO(backend): replace with e.g. `return apiClient.get(`/projects/${id}`)`
  await new Promise((resolve) => setTimeout(resolve, 300));
  const project = MOCK_PROJECTS.find((p) => p.id === id);
  if (!project) throw new Error(`Project "${id}" not found`);
  return project;
}