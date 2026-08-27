import { useState, useRef } from "react";

const ALLOWED_EXT = ["pdf", "doc", "docx", "txt"];
const MAX_SIZE = 50 * 1024 * 1024; // 50MB

function extOf(name) {
  return name.split(".").pop().toLowerCase();
}
function fmtSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}
function iconLabel(ext) {
  if (ext === "pdf") return { label: "PDF", color: "text-rose-600 bg-rose-50 border-rose-200" };
  if (ext === "doc" || ext === "docx")
    return { label: "DOC", color: "text-indigo-600 bg-indigo-50 border-indigo-200" };
  return { label: "TXT", color: "text-emerald-600 bg-emerald-50 border-emerald-200" };
}

export default function ProjectDocumentUpload({ file, setFile, error, setError }) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

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

  return (
    <div>
      <div className="text-[13.5px] font-semibold text-[#1A1A2E] mb-2">Upload BRD / Document</div>

      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`text-center rounded-xl border-[1.5px] border-dashed px-5 py-9 cursor-pointer transition-all ${
            error
              ? "border-[#DC2626] bg-[#FCEBEB]"
              : dragOver
              ? "border-[#9333EA] bg-[#EDF1FE] shadow-[0_0_0_4px_rgba(147,51,234,0.14)]"
              : "border-[#E3E7F5] bg-[#F8F9FE] hover:border-[#2563EB] hover:bg-[#EDF1FE]"
          }`}
        >
          <div className="w-12 h-12 rounded-[13px] mx-auto mb-3.5 bg-gradient-to-br from-[#2563EB] to-[#9333EA] flex items-center justify-center text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
            </svg>
          </div>
          <div className="text-[13.5px] text-[#686D80] mb-3.5">
            Drag &amp; drop your file here, or
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="text-xs font-bold text-white bg-gradient-to-br from-[#2563EB] to-[#9333EA] px-5 py-2.5 rounded-full shadow-[0_8px_18px_-6px_rgba(124,58,237,0.5)] hover:brightness-105 hover:-translate-y-px transition-all"
          >
            Browse file
          </button>
          <div className="text-[11.5px] font-mono text-[#9599AC] mt-3.5">
            SUPPORTS PDF, DOCX, TXT · MAX 50MB
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => validateAndSetFile(e.target.files[0])}
            className="hidden"
          />
        </div>
      ) : (
        <div className="flex items-center gap-3 border border-[#E3E7F5] rounded-xl bg-[#F8F9FE] px-4 py-3.5">
          <div
            className={`w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 border ${
              iconLabel(extOf(file.name)).color
            }`}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <path d="M14 2v6h6" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13.5px] font-semibold text-[#1A1A2E] truncate">{file.name}</div>
            <div className="text-xs font-mono text-[#686D80] mt-0.5">
              {iconLabel(extOf(file.name)).label} · {fmtSize(file.size)}
            </div>
            <div className="h-1 rounded-full bg-[#ECEFFA] mt-2 overflow-hidden">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#9333EA] transition-all" />
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setFile(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            className="w-[30px] h-[30px] rounded-full border border-[#E3E7F5] flex items-center justify-center text-[#686D80] hover:border-[#DC2626] hover:text-[#DC2626] hover:bg-[#FCEBEB] flex-shrink-0 transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

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