import { useState } from "react";
import ProjectDocumentUpload from "./ProjectDocumentUpload";

export default function ProjectForm({ onCreated, onBeforeResources }) {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [nameError, setNameError] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    let valid = true;
    if (name.trim() === "") {
      setNameError(true);
      valid = false;
    }
    if (!file) {
      setFileError(true);
      valid = false;
    }
    if (!valid) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onCreated?.(name.trim());
    }, 1400);
  }

  function handleBeforeResources() {
    if (name.trim() === "") {
      setNameError(true);
      return;
    }
    setNameError(false);
    onBeforeResources?.();
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Project name */}
      <div className="mb-[22px]">
        <div className="text-[13.5px] font-semibold text-[#1A1A2E] mb-2">Project Name</div>
        <input
          type="text"
          maxLength={80}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError(false);
          }}
          placeholder="e.g. Insurance App"
          className={`w-full text-sm rounded-[9px] px-3.5 py-2.5 bg-[#F8F9FE] border transition-all focus:outline-none focus:bg-white focus:ring-[3px] focus:ring-[#EDF1FE] ${
            nameError ? "border-[#DC2626] bg-[#FCEBEB]" : "border-[#E3E7F5] focus:border-[#2563EB]"
          }`}
        />
        {nameError && (
          <div className="flex items-center gap-1.5 text-xs text-[#DC2626] mt-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v5M12 16h.01" />
            </svg>
            Enter a project name to continue.
          </div>
        )}
      </div>

      {/* File upload (separate component) */}
      <ProjectDocumentUpload
        file={file}
        setFile={setFile}
        error={fileError}
        setError={setFileError}
      />

            {/* Footer */}
      <div className="flex flex-col gap-3.5 mt-7 pt-[22px] border-t border-[#ECEFFA]">
        <div className="text-xs text-[#9599AC] leading-relaxed">
          Agent 1 typically takes 20–40 seconds
          <br />
          to extract features from a document.
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <button
            type="button"
            onClick={handleBeforeResources}
            className="text-[13.5px] font-bold text-white bg-[#9333EA] border border-[#9333EA] px-[22px] py-3 rounded-full shadow-[0_10px_24px_-8px_rgba(147,51,234,0.45)] hover:brightness-110 hover:-translate-y-px transition-all text-center"
          >
            Before Allocated Resources
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 text-[13.5px] font-bold text-white bg-gradient-to-br from-[#2563EB] to-[#9333EA] px-[22px] py-3 rounded-full shadow-[0_10px_24px_-8px_rgba(124,58,237,0.5)] hover:brightness-105 hover:-translate-y-px transition-all disabled:opacity-60 disabled:cursor-not-allowed">
            {submitting ? (
              <>
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                Starting Agent 1…
              </>
            ) : (
              <>
                All Questions
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}