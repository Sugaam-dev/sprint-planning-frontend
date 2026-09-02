import { useRef } from "react";
import WorkflowStepper from "./WorkflowStepper";
import logo from "../assets/logo-light.png";

export default function WorkflowHeader({ activeStep = "extract-features" }) {
  const btnRef = useRef(null);

  function handleMouseMove(e) {
    const btn = btnRef.current;
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.18;
    const y = (e.clientY - r.top - r.height / 2) * 0.28;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  }
  function handleMouseLeave() {
    btnRef.current.style.transform = "translate(0,0)";
  }

    return (
    <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-10 py-3 sm:py-4 bg-white/80 backdrop-blur-md border-b border-[#e7e2f3]">
      <div className="flex items-center shrink-0">
        <img src={logo} alt="PMRG Solution" className="h-7 sm:h-9 w-auto" />
      </div>

      <div className="flex items-center gap-3 sm:gap-[18px] overflow-x-auto">
        <button
          ref={btnRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="bg-gradient-to-br from-[#8b5cf6] to-[#5b21c8] text-white border-none px-3.5 sm:px-[18px] py-2 sm:py-[9px] rounded-[9px] font-semibold text-[12.5px] sm:text-[13.5px] shadow-[0_8px_18px_-6px_rgba(124,58,237,0.55)] transition-transform whitespace-nowrap shrink-0"
        >
          New Project
        </button>
        <WorkflowStepper activeStep={activeStep} />
      </div>
    </header>
  );
}