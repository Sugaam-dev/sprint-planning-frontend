import ProjectForm from "../../features/project/components/ProjectForm";

export default function CreateProject() {
  return (
    <div className="min-h-screen bg-[#F8F9FE] py-10 px-4">
      <div className="max-w-[620px] mx-auto">
        <h1 className="text-xl font-bold text-[#1A1A2E] mb-6">Create New Project</h1>
        <ProjectForm />
      </div>
    </div>
  );
}