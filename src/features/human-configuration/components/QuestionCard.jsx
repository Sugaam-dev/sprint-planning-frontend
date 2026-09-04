import { useState } from "react";

export default function QuestionCard({ number, title, subtitle, complete, children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="bg-white border border-[#E7E4DD] rounded-[14px] px-5 py-[18px] shadow-[0_1px_2px_rgba(27,23,48,0.03)]">
      <div
        onClick={() => setCollapsed((c) => !c)}
        className="flex items-start gap-3 cursor-pointer"
      >
        <div className="w-6 h-6 rounded-full border-[1.5px] border-[#6D5EF5] text-[#6D5EF5] font-mono text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-px">
          {number}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[14.5px] text-[#5847E8]">{title}</div>
          <div className="text-xs text-[#767085] mt-0.5 leading-relaxed">{subtitle}</div>
        </div>
        <div className="flex items-center gap-2.5 flex-shrink-0 mt-px">
          <div
            className={`flex items-center gap-1.5 text-[11.5px] font-bold rounded-full px-2.5 py-1.5 whitespace-nowrap ${
              complete
                ? "text-[#1E9E6B] bg-[#E6F7EF]"
                : "text-[#A29CB5] bg-[#F5F4F0]"
            }`}
          >
            <span className="text-[11px]">{complete ? "✓" : "○"}</span>
            {complete ? "Completed" : "Incomplete"}
          </div>
          <div
            className={`w-[22px] h-[22px] flex items-center justify-center text-[#A29CB5] transition-transform ${
              collapsed ? "-rotate-90" : ""
            }`}
          >
            ▾
          </div>
        </div>
      </div>

      {!collapsed && <div className="mt-4 pt-0.5">{children}</div>}
    </div>
  );
}