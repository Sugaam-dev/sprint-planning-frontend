import { useState, useRef } from "react";

const ALLOWED_EXT = ["pdf", "doc", "docx", "txt"];
const MAX_SIZE = 50 * 1024 * 1024;

function extOf(name) {
  return name.split(".").pop().toLowerCase();
}

export default function ProjectDocumentUpload({ file, setFile, error, setError }) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const browseBtnRef = useRef(null);

  function validateAndSetFile(selected) {
    if (!selected) return;
    const ext = extOf(selected.name);
    if (!ALLOWED_EXT.includes(ext)) {
      alert("Unsupported file type. Use PDF, DOC, DOCX or TXT.");
      return;
    }
    if (selected.size > MAX_SIZE) {
      alert("File is larger than the 50MB limit.");
      return;
    }
    setFile(selected);
    setError(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    validateAndSetFile(e.dataTransfer.files[0]);
  }

  function spawnRipple(e) {
    const btn = browseBtnRef.current;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(255,255,255,0.6)";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "rippleAnim 0.55s ease-out";
    ripple.style.pointerEvents = "none";
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - rect.left - size / 2 + "px";
    ripple.style.top = e.clientY - rect.top - size / 2 + "px";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 550);
  }

  function handleBrowseClick(e) {
    spawnRipple(e);
    fileInputRef.current?.click();
  }

  return (
    <div>
      <div className="text-[13.5px] font-semibold text-[#171325] mb-2.5">
        Upload BRD / Document
      </div>

      <div
        onClick={() => !file && fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative overflow-hidden text-center rounded-2xl px-6 pt-12 pb-8 cursor-pointer transition-all ${
          dragOver
            ? "border border-[#7c3aed] scale-[1.015] bg-[#f1e9ff]"
            : error
            ? "border-[1.5px] border-dashed border-[#DC2626] bg-[#FCEBEB]"
            : "border-[1.5px] border-dashed border-[#d8cff0] hover:border-[#8b5cf6]"
        }`}
        style={
          !dragOver && !error
            ? {
                background:
                  "radial-gradient(120% 140% at 50% 0%, #f5f0ff 0%, #fbfaff 55%, #faf9fd 100%)",
              }
            : {}
        }
      >
        {/* scan line while dragging */}
        {dragOver && (
          <div
            className="absolute left-0 right-0 h-0.5 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, #06b6d4, transparent)",
              animation: "scanLine 1.1s ease-in-out infinite",
            }}
          />
        )}

        {/* filetype badges */}
        <div className="flex items-center justify-center gap-2 mb-[18px]">
          {[
            { label: "PDF", from: "#f4574f", to: "#d63b34", delay: "0.05s" },
            { label: "DOCX", from: "#4d8bff", to: "#2f65e6", delay: "0.13s" },
            { label: "TXT", from: "#8b93a1", to: "#69707d", delay: "0.21s" },
          ].map((b) => (
            <span
              key={b.label}
              className="flex items-center justify-center h-6 px-[9px] rounded-[7px] text-white font-bold text-[10.5px] tracking-wide opacity-0"
              style={{
                background: `linear-gradient(135deg, ${b.from}, ${b.to})`,
                boxShadow: "0 4px 10px -4px rgba(0,0,0,0.28)",
                animation: `badgeIn 0.4s cubic-bezier(.2,.7,.2,1) forwards ${b.delay}`,
              }}
            >
              {b.label}
            </span>
          ))}
        </div>

        {/* orbiting icon */}
        <div className="relative w-14 h-14 mx-auto mb-5">
          <div
            className="absolute -inset-[9px] rounded-full border border-dashed"
            style={{
              borderColor: "rgba(124,58,237,0.3)",
              animation: "spinSlow 6s linear infinite",
            }}
          >
            <span
              className="absolute w-[5px] h-[5px] rounded-full -top-[2.5px] left-1/2 -translate-x-1/2"
              style={{
                background: "#06b6d4",
                boxShadow: "0 0 8px rgba(6,182,212,0.7)",
              }}
            />
          </div>
          <div
            className="w-full h-full rounded-[14px] flex items-center justify-center"
            style={{
              background: file
                ? "linear-gradient(140deg, #22c58d, #159b6d)"
                : "linear-gradient(140deg, #8b5cf6, #5b21c8)",
              boxShadow: "0 14px 30px -10px rgba(124,58,237,0.55)",
              animation: file ? "none" : "floatIcon 3s ease-in-out infinite",
            }}
          >
            {file ? (
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
                <path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        </div>

        <div className="text-[#6f6a82] text-sm mb-5">
          {file ? `${file.name} selected` : "Drag & drop your file here, or"}
        </div>

        <button
          ref={browseBtnRef}
          type="button"
          onClick={handleBrowseClick}
          className="relative overflow-hidden inline-block text-white border-none px-6 py-[10.5px] rounded-[9px] font-semibold text-[13.5px] mb-[18px] active:scale-[0.97] transition-transform"
          style={{
            background: "linear-gradient(135deg, #8b5cf6, #5b21c8)",
            boxShadow: "0 10px 24px -8px rgba(124,58,237,0.55)",
          }}
        >
          Browse file
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={(e) => validateAndSetFile(e.target.files[0])}
          className="hidden"
        />

        <div className="font-mono text-[11px] tracking-wide text-[#a29cb5]">
          {file ? (
            <>
              READY TO EXTRACT &nbsp;·&nbsp; click browse to replace
            </>
          ) : (
            <>
              MAX FILE SIZE <b className="text-[#6f6a82] font-medium">50MB</b>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-[#DC2626] mt-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v5M12 16h.01" />
          </svg>
          Upload a BRD or requirements document to continue.
        </div>
      )}
    </div>
  );
}