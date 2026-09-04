export default function ProjectBasicsCard() {
  return (
    <div className="bg-white border-2 border-[#e4e2ee] border-t-[6px] border-t-[#5b4fe9] rounded-[22px] p-8 shadow-sm h-full flex flex-col">
      <div className="font-mono text-[10.5px] tracking-widest uppercase text-[#6c7086] mb-1.5">
        Project basics
      </div>

      <h2 className="text-xl font-semibold flex items-center mb-1.5">
        <span className="w-9 h-9 rounded-[11px] mr-3 flex items-center justify-center text-white text-base bg-gradient-to-br from-[#5b4fe9] to-[#e0479e]">
          ◆
        </span>
        What are you building?
      </h2>

      <p className="text-[13px] text-[#6c7086] leading-relaxed mb-6">
        Name the project and describe its scope — the more detail, the sharper the stories.
      </p>

      <div>
        <label className="block text-[10px] font-semibold text-[#6c7086] mb-2 tracking-wide uppercase font-mono">
          Project Name
        </label>
        <input
          type="text"
          placeholder="e.g. E-Commerce Platform Q3 2026 (optional — auto-generated)"
          className="w-full border-2 border-[#e4e2ee] rounded-xl px-4 py-3.5 text-[13.5px] bg-[#fbfbfe] focus:outline-none focus:border-[#5b4fe9] focus:bg-white focus:ring-4 focus:ring-[#f0eefd]"
        />
        <div className="text-[11.5px] text-[#6c7086] mt-2 leading-relaxed">
          Leave blank and it'll be named automatically.
        </div>
      </div>

      <div className="mt-5">
        <label className="block text-[10px] font-semibold text-[#6c7086] mb-2 tracking-wide uppercase font-mono">
          Release Scope
        </label>
        <textarea
          placeholder="Describe your product scope, features, and requirements..."
          className="w-full min-h-[120px] border-2 border-[#e4e2ee] rounded-xl px-4 py-3.5 text-[13.5px] bg-[#fbfbfe] focus:outline-none focus:border-[#5b4fe9] focus:bg-white focus:ring-4 focus:ring-[#f0eefd] resize-y"
        />
        <button className="mt-4 inline-flex items-center gap-2 bg-gradient-to-br from-[#e2582b] to-[#e0900a] text-white rounded-[11px] px-5 py-3 text-[13px] font-semibold shadow-md">
          ⇧ Upload PDF instead
        </button>
        <div className="text-[11px] text-[#6c7086] mt-2.5">
          or type above · <b className="text-[#161a2e]">PDF files up to 10MB.</b>
        </div>
      </div>
    </div>
  );
}