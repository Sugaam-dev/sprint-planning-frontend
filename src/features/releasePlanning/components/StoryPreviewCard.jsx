export default function StoryPreviewCard() {
  return (
    <div className="relative overflow-hidden bg-white border-2 border-[#e4e2ee] border-t-[6px] border-t-[#2e9de0] rounded-[22px] p-8 shadow-sm h-full flex flex-col">
      {/* decorative shapes */}
      <div className="absolute -top-[22px] -right-[22px] w-16 h-16 rounded-full border-[10px] border-[#f0eefd] pointer-events-none" />

      <div className="font-mono text-[10.5px] tracking-widest uppercase text-[#6c7086] mb-1.5">
        Sneak peek
      </div>

      <h2 className="text-xl font-semibold flex items-center mb-1.5">
        <span className="w-9 h-9 rounded-[11px] mr-3 flex items-center justify-center text-white text-base bg-gradient-to-br from-[#2e9de0] to-[#5b4fe9]">
          ✎
        </span>
        What you'll get back
      </h2>

      <p className="text-[13px] text-[#6c7086] leading-relaxed mb-6">
        Your scope turns into structured story cards like this one — ready to drop into your sprint board.
      </p>

      <div className="border-2 border-[#e4e2ee] rounded-2xl p-5 -rotate-[1.2deg] bg-[#fbfbfe]">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs font-semibold text-[#332a9e]">STORY-014</span>
          <span className="text-[11px] font-semibold text-[#c8431a] bg-[#fef1ec] border border-[#f8d3c2] rounded-full px-2.5 py-1">
            High priority
          </span>
        </div>

        <h4 className="text-[14.5px] font-semibold text-[#161a2e] leading-snug mb-3">
          As a returning customer, I want my payment method saved so checkout is faster.
        </h4>

        <ul className="space-y-1.5 mb-4">
          <li className="text-[12.5px] text-[#6c7086] pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#5b4fe9]">
            Card details are stored securely for next visit
          </li>
          <li className="text-[12.5px] text-[#6c7086] pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#5b4fe9]">
            Customer can add, edit, or remove a saved card
          </li>
          <li className="text-[12.5px] text-[#6c7086] pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#5b4fe9]">
            Checkout pre-fills the saved method by default
          </li>
        </ul>

        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#332a9e] bg-[#f0eefd] rounded-full px-3 py-1">
            5 pts
          </span>
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5b4fe9] to-[#e0479e] text-white text-xs font-semibold flex items-center justify-center">
            RS
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[11.5px] text-[#6c7086] mt-5">
        <span className="w-2 h-2 rounded-full bg-[#2e9de0] inline-block" />
        One of many — every story is scoped, estimated, and assigned automatically.
      </div>
    </div>
  );
}