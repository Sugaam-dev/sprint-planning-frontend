import WorkflowStepper from "./WorkflowStepper";

export default function WorkflowHeader({ activeStep = "new-project" }) {
  return (
    <header className="bg-white border-b border-[#E7E4DD] sticky top-0 z-30">
      <div className="max-w-[1100px] mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6D5EF5] to-[#9333EA] flex items-center justify-center text-white font-bold text-[15px]">
            P
          </div>
          <span className="font-bold text-[15px] text-[#1B1730]">PMRG Solution</span>
        </div>
        <WorkflowStepper activeStep={activeStep} />
      </div>
    </header>
  );
}