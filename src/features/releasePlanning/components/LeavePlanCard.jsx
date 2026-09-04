export default function LeavePlanCard() {
  return (
    <div className="bg-white border-2 border-[#e4e2ee] border-t-[6px] border-t-[#0f9d6e] rounded-[22px] p-8 shadow-sm h-full flex flex-col">
      <div className="font-mono text-[10.5px] tracking-widest uppercase text-[#6c7086] mb-1.5">
        Leave plan{" "}
        <span className="inline-block font-mono text-[9.5px] tracking-wide uppercase text-[#0f9d6e] bg-[#eefaf4] border border-[#bfeadb] px-2.5 py-0.5 rounded-full ml-2 align-middle">
          optional
        </span>
      </div>

      <h2 className="text-xl font-semibold flex items-center mb-1.5">
        <span className="w-9 h-9 rounded-[11px] mr-3 flex items-center justify-center text-white text-base bg-gradient-to-br from-[#0f9d6e] to-[#2e9de0]">
          ▤
        </span>
        Any planned time off?
      </h2>

      <p className="text-[13px] text-[#6c7086] leading-relaxed mb-6">
        Upload the team's leave schedule so sprint capacity accounts for it.
      </p>

      <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#bfeadb] rounded-2xl py-8 px-4 text-center cursor-pointer hover:bg-[#eefaf4] transition-colors">
        <span className="text-2xl text-[#0f9d6e]">⇧</span>
        <span className="text-sm font-semibold text-[#161a2e]">Upload Leave Plan Excel</span>
        <span className="text-[11.5px] text-[#6c7086]">
          .xls or .xlsx, up to 10MB
          <br />
          Include names, leave dates, and leave type
        </span>
        <input type="file" accept=".xls,.xlsx" className="hidden" />
      </label>

      <div className="mt-5 border-2 border-[#e4e2ee] rounded-xl p-4">
        <div className="text-[11.5px] font-semibold text-[#161a2e] mb-2">Expected format</div>
        <ul className="space-y-1">
          <li className="text-[12px] text-[#6c7086] pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#0f9d6e]">
            Column A: Team Member Name
          </li>
          <li className="text-[12px] text-[#6c7086] pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#0f9d6e]">
            Column B: Leave Start Date
          </li>
          <li className="text-[12px] text-[#6c7086] pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#0f9d6e]">
            Column C: Leave End Date
          </li>
          <li className="text-[12px] text-[#6c7086] pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#0f9d6e]">
            Column D: Leave Type (Vacation, Sick, etc.)
          </li>
        </ul>
      </div>
    </div>
  );
}