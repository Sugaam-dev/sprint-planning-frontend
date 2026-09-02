import { useState, useEffect, useRef } from "react";
import ProjectForm from "../../features/project/components/ProjectForm";
import ConfigurationForm from "../../features/human-configuration/components/ConfigurationForm";
import WorkflowHeader from "../../workflow/WorkflowHeader";

export default function CreateProject() {
  const [showConfig, setShowConfig] = useState(false);
  const [configMode, setConfigMode] = useState("essential");
  const spotlightRef = useRef(null);

  useEffect(() => {
    function handleMouseMove(e) {
      if (spotlightRef.current) {
        spotlightRef.current.style.left = e.clientX + "px";
        spotlightRef.current.style.top = e.clientY + "px";
      }
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  function handleBeforeResources() {
    setConfigMode("essential");
    setShowConfig(true);
  }

  function handleCreated() {
    setConfigMode("full");
    setShowConfig(true);
  }

  return (
    <div className="min-h-screen bg-[#f8f7fc] relative overflow-hidden">
      {/* grid overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 90%)",
        }}
      />
      {/* orbs */}
      <div
        className="fixed z-0 pointer-events-none rounded-full opacity-60"
        style={{
          width: 440,
          height: 440,
          top: -140,
          right: -110,
          background: "radial-gradient(circle, rgba(139,92,246,0.45), transparent 70%)",
          filter: "blur(90px)",
          animation: "driftA 14s ease-in-out infinite",
        }}
      />
      <div
        className="fixed z-0 pointer-events-none rounded-full opacity-60"
        style={{
          width: 400,
          height: 400,
          bottom: -150,
          left: -110,
          background: "radial-gradient(circle, rgba(6,182,212,0.30), transparent 70%)",
          filter: "blur(90px)",
          animation: "driftB 17s ease-in-out infinite",
        }}
      />

      {/* mouse-following spotlight */}
      <div
        ref={spotlightRef}
        className="fixed z-0 pointer-events-none rounded-full"
        style={{
          width: 700,
          height: 700,
          left: 0,
          top: 0,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(124,58,237,0.10), transparent 68%)",
          transition: "left .12s linear, top .12s linear",
        }}
      />

      <div className="relative z-10">
        <WorkflowHeader activeStep="extract-features" />

        <div className="max-w-[1280px] xl:max-w-[1500px] 2xl:max-w-[1700px] mx-auto px-10 py-14 pb-24 flex justify-center">
              <div className="w-full max-w-[640px] xl:max-w-[760px] 2xl:max-w-[980px]">
            <div
              className="inline-flex items-center gap-[7px] font-mono text-[11px] tracking-wide text-[#0891b2] mb-5 opacity-0"
              style={{ animation: "rise 0.55s ease forwards" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]"
                style={{
                  boxShadow: "0 0 8px rgba(6,182,212,0.7)",
                  animation: "blinkDot 1.6s ease-in-out infinite",
                }}
              />
              AGENT 1 · READY TO EXTRACT
            </div>

            <button
              className="flex items-center gap-1.5 text-[13px] text-[#6f6a82] font-medium mb-[22px] hover:text-[#7c3aed] transition-colors opacity-0"
              style={{ animation: "rise 0.55s ease forwards 0.05s" }}
            >
              ← Back
            </button>

            <h1
              className="font-bold text-[36px] tracking-tight text-[#171325] mb-3 opacity-0"
              style={{ animation: "rise 0.6s ease forwards 0.12s" }}
            >
              Create{" "}
              <span className="bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] bg-clip-text text-transparent">
                New Project
              </span>
            </h1>

            <p
              className="text-[#6f6a82] text-[15px] leading-[1.65] max-w-[480px] mb-9 opacity-0"
              style={{ animation: "rise 0.6s ease forwards 0.2s" }}
            >
              Give Agent 1 a business requirements document and it will extract a structured feature list for you to review.
            </p>

            <div
              className="bg-gradient-to-b from-white to-[#fdfcff] rounded-[20px] border border-[#e7e2f3] shadow-[0_30px_70px_-36px_rgba(90,60,160,0.28)] overflow-hidden opacity-0 relative"
              style={{ animation: "cardIn 0.65s cubic-bezier(.2,.7,.2,1) forwards 0.32s" }}
            >
              <div
                className="h-[3px] bg-gradient-to-r from-[#06b6d4] via-[#7c3aed] to-[#c084fc]"
                style={{ backgroundSize: "200% 100%", animation: "shimmer 5s linear infinite" }}
              />
              <div className="p-9 sm:p-10 pt-9">
                <ProjectForm onBeforeResources={handleBeforeResources} onCreated={handleCreated} />
              </div>
            </div>

            {showConfig && (
              <div className="mt-10">
                <ConfigurationForm initialMode={configMode} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}