import { useState, useRef, useEffect } from "react";

const NAMES = ["Rahul Sharma", "Amit Kumar", "Priya Singh", "Neha Das", "Dhurjoti Ghosh", "Suman Roy"];
const TAGS = [
  "Python Developer", "React", "Node.js", "Frontend", "Backend",
  "Full Stack", "DevOps", "QA / Testing", "UI/UX Design",
  "Mobile (iOS/Android)", "Data Engineer", "Product Manager",
];

export default function TeamCard() {
  // ---- name select state ----
  const [nameOpen, setNameOpen] = useState(false);
  const [nameSearch, setNameSearch] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const nameRef = useRef(null);

  // ---- tag multi-select state ----
  const [tagOpen, setTagOpen] = useState(false);
  const [tagSearch, setTagSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const tagRef = useRef(null);

  // close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (nameRef.current && !nameRef.current.contains(e.target)) setNameOpen(false);
      if (tagRef.current && !tagRef.current.contains(e.target)) setTagOpen(false);
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const filteredNames = NAMES.filter((n) =>
    n.toLowerCase().includes(nameSearch.toLowerCase())
  );
  const filteredTags = TAGS.filter((t) =>
    t.toLowerCase().includes(tagSearch.toLowerCase())
  );

  function toggleTag(tag) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  return (
    <div className="bg-white border-2 border-[#e4e2ee] border-t-[6px] border-t-[#e2582b] rounded-[22px] p-8 shadow-sm h-full flex flex-col">
      <div className="font-mono text-[10.5px] tracking-widest uppercase text-[#6c7086] mb-1.5">
        Team
      </div>

      <h2 className="text-xl font-semibold flex items-center mb-1.5">
        <span className="w-9 h-9 rounded-[11px] mr-3 flex items-center justify-center text-white text-base bg-gradient-to-br from-[#e2582b] to-[#e0900a]">
          ◈
        </span>
        Who's on the team?
      </h2>

      <p className="text-[13px] text-[#6c7086] leading-relaxed mb-6">
        Pick a team member so stories can be shaped around their skills.
      </p>

      {/* ---------- Name select ---------- */}
      <div className="relative" ref={nameRef}>
        <label className="block text-[10px] font-semibold text-[#6c7086] mb-2 tracking-wide uppercase font-mono">
          Name
        </label>
        <div
          onClick={() => setNameOpen((o) => !o)}
          className={`w-full flex items-center justify-between border-2 border-[#5b4fe9] rounded-xl px-4 py-3.5 bg-white text-[13.5px] cursor-pointer select-none ${
            selectedName ? "text-[#161a2e] font-medium" : "text-[#b3b6c7]"
          }`}
        >
          <span>{selectedName || "Select Name"}</span>
          <span className={`text-[#332a9e] text-xs transition-transform ${nameOpen ? "rotate-180" : ""}`}>
            ▾
          </span>
        </div>

        {nameOpen && (
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white border-2 border-[#e4e2ee] rounded-2xl shadow-xl p-3 z-20">
            <div className="flex items-center gap-2 border-2 border-[#5b4fe9] rounded-lg px-3 py-2.5 mb-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#332a9e] shrink-0">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                autoFocus
                type="text"
                placeholder="Search name..."
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
                className="border-none outline-none bg-transparent text-[13.5px] w-full text-[#161a2e]"
              />
            </div>
            <div className="max-h-[220px] overflow-y-auto">
              {filteredNames.length === 0 ? (
                <div className="text-[#6c7086] text-center py-3 text-[13.5px]">No matches found</div>
              ) : (
                filteredNames.map((n) => (
                  <div
                    key={n}
                    onClick={() => {
                      setSelectedName(n);
                      setNameOpen(false);
                    }}
                    className="px-2 py-3 text-[13.5px] text-[#161a2e] cursor-pointer border-b border-[#e4e2ee] last:border-none hover:bg-[#f0eefd] hover:pl-3.5 transition-all"
                  >
                    {n}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* ---------- Tag multi-select ---------- */}
      <div className="relative mt-4" ref={tagRef}>
        <label className="block text-[10px] font-semibold text-[#6c7086] mb-2 tracking-wide uppercase font-mono">
          Tags
        </label>
        <div
          onClick={() => setTagOpen((o) => !o)}
          className="w-full min-h-[50px] flex items-center flex-wrap gap-1.5 justify-between border-2 border-[#5b4fe9] rounded-xl px-4 py-2.5 bg-white text-[13.5px] cursor-pointer select-none"
        >
          <div className="flex items-center flex-wrap gap-1.5 flex-1">
            {selectedTags.length === 0 ? (
              <span className="text-[#b3b6c7]">Select Tags</span>
            ) : (
              selectedTags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 bg-[#f0eefd] text-[#332a9e] rounded-full pl-3 pr-1.5 py-1 text-xs font-semibold"
                >
                  {t}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTag(t);
                    }}
                    className="w-4 h-4 flex items-center justify-center rounded-full bg-[#5b4fe9]/15 text-[11px] leading-none cursor-pointer hover:bg-[#5b4fe9]/30"
                  >
                    ✕
                  </span>
                </span>
              ))
            )}
          </div>
          <span className={`text-[#332a9e] text-xs transition-transform shrink-0 ${tagOpen ? "rotate-180" : ""}`}>
            ▾
          </span>
        </div>

        {tagOpen && (
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white border-2 border-[#e4e2ee] rounded-2xl shadow-xl p-3 z-20">
            <div className="flex items-center gap-2 border-2 border-[#5b4fe9] rounded-lg px-3 py-2.5 mb-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#332a9e] shrink-0">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                autoFocus
                type="text"
                placeholder="Search tag..."
                value={tagSearch}
                onChange={(e) => setTagSearch(e.target.value)}
                className="border-none outline-none bg-transparent text-[13.5px] w-full text-[#161a2e]"
              />
            </div>
            <div className="max-h-[220px] overflow-y-auto">
              {filteredTags.length === 0 ? (
                <div className="text-[#6c7086] text-center py-3 text-[13.5px]">No matches found</div>
              ) : (
                filteredTags.map((t) => {
                  const isSelected = selectedTags.includes(t);
                  return (
                    <div
                      key={t}
                      onClick={() => toggleTag(t)}
                      className="flex items-center gap-2.5 px-2 py-3 text-[13.5px] text-[#161a2e] cursor-pointer border-b border-[#e4e2ee] last:border-none hover:bg-[#f0eefd]"
                    >
                      <span
                        className={`w-4 h-4 rounded flex items-center justify-center shrink-0 text-white text-[11px] border-2 border-[#5b4fe9] ${
                          isSelected ? "bg-[#5b4fe9]" : ""
                        }`}
                      >
                        {isSelected ? "✓" : ""}
                      </span>
                      <span>{t}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto pt-5 px-4 py-3.5 bg-[#fef1ec] border border-[#f8d3c2] rounded-xl text-[11.5px] text-[#8a4222] leading-relaxed">
        Add each team member one at a time — stories are matched to whoever is selected here.
      </div>
    </div>
  );
}