const STEPS = [
  { key: "new-project", label: "New Project" },
  { key: "extract-features", label: "Extract Features" },
  { key: "user-stories", label: "User Stories" },
];

export default function WorkflowStepper({ activeStep }) {
  const activeIndex = STEPS.findIndex((s) => s.key === activeStep);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {STEPS.map((step, i) => {
        const isActive = i === activeIndex;
        const isDone = i < activeIndex;
        return (
          <div key={step.key} className="flex items-center gap-2">
            {i > 0 && <span className="w-6 h-px bg-[#E7E4DD]" />}
            <div
              className={`flex items-center gap-1.5 text-[12.5px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap ${
                isActive
                  ? "bg-[#6D5EF5] text-white"
                  : isDone
                  ? "bg-[#EFEDFE] text-[#5847E8]"
                  : "bg-[#FAF9F6] text-[#A29CB5] border border-[#E7E4DD]"
              }`}
            >
              {!isActive && <span className="text-[10.5px]">{isDone ? "✓" : i}</span>}
              {step.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}