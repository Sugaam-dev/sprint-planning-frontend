// Project feature API layer.
//
// The mock data itself lives in ./mockProjects.json (a plain JSON file) —
// this file only contains the functions that read it. Vite lets you import
// JSON directly, and it gets bundled just like a JS object would.
//
// There's no backend yet, so `fetchProjects`/`fetchProjectById` just read
// from that JSON after a fake delay (so loading states are visible). When
// the real endpoint exists, replace the body of each function with a real
// HTTP call — keep the shapes the same, since every component was built
// against these fields.

import mockData from "./mockProjects.json";

const { projects: MOCK_PROJECTS, detailTemplate: DETAIL_TEMPLATE } = mockData;

export async function fetchProjects() {
  // TODO(backend): replace with e.g. `return apiClient.get("/projects")`
  await new Promise((resolve) => setTimeout(resolve, 400));
  return MOCK_PROJECTS;
}

export async function fetchProjectById(id) {
  // TODO(backend): replace with e.g. `return apiClient.get(`/projects/${id}`)`
  await new Promise((resolve) => setTimeout(resolve, 300));
  const base = MOCK_PROJECTS.find((p) => p.id === id);
  if (!base) throw new Error(`Project "${id}" not found`);
  // Merge the list-level fields with the shared demo detail template.
  return { ...base, ...DETAIL_TEMPLATE };
}