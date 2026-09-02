const STEPS = [
  { key: "extract-features", label: "Extract Features" },
  { key: "user-stories", label: "User Stories" },
];

export default function WorkflowStepper({ activeStep }) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
      {STEPS.map((step, i) => {
        const isActive = step.key === activeStep;
        return (
          <div key={step.key} className="flex items-center gap-1.5 sm:gap-2.5">
            {i > 0 && <span className="w-3 sm:w-[22px] h-[1.5px] bg-[#e7e2f3] shrink-0" />}
            <div
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full border text-[12.5px] font-medium whitespace-nowrap ${
                isActive
                  ? "border-[#7c3aed]/35 text-[#171325] bg-[#f5f0ff]"
                  : "border-[#e7e2f3] text-[#a29cb5]"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0 ${
                  isActive ? "bg-[#8b5cf6] text-white" : "bg-[#f1eefa] text-[#a29cb5]"
                }`}
                style={isActive ? { animation: "pulseDot 2s ease-in-out infinite" } : {}}
              >
                {i + 1}
              </span>
              <span className="hidden sm:inline">{step.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}