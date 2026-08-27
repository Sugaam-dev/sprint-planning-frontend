// Generic answer renderer — dispatches based on `type`
export default function AnswerInput({
  type,
  label,
  value,
  options,
  onChange,
  placeholder,
  unit,
}) {
  const labelEl = label && (
    <label className="block text-[11.5px] font-semibold text-[#767085] mb-1.5">
      {label}
    </label>
  );

  if (type === "select") {
    return (
      <div>
        {labelEl}
        <div className="relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full appearance-none text-[13.5px] font-semibold text-[#1B1730] bg-white border-[1.5px] border-[#E7E4DD] rounded-[9px] px-3 py-2.5 pr-8 cursor-pointer focus:outline-none focus:border-[#6D5EF5]"
          >
            {options.map((o) => (
              <option key={o.v} value={o.v}>
                {o.l}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-[65%] w-2 h-2 border-r-[1.5px] border-b-[1.5px] border-[#A29CB5] rotate-45" />
        </div>
      </div>
    );
  }

  if (type === "pills") {
    return (
      <div>
        {labelEl}
        <div className="flex flex-wrap gap-2">
          {options.map((o) => (
            <button
              key={o.v}
              type="button"
              onClick={() => onChange(o.v)}
              className={`text-[12.5px] font-semibold px-3.5 py-2 rounded-full border-[1.5px] transition-all ${
                value === o.v
                  ? "bg-[#6D5EF5] border-[#6D5EF5] text-white"
                  : "bg-white border-[#E7E4DD] text-[#1B1730] hover:border-[#6D5EF5]"
              }`}
            >
              {o.l}
              {o.rec && value !== o.v && (
                <span className="ml-1 text-[10px] text-[#0F9E8E]">★</span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (type === "cards") {
    return (
      <div>
        {labelEl}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {options.map((o) => (
            <button
              key={o.v}
              type="button"
              onClick={() => onChange(o.v)}
              className={`text-left text-[13px] font-semibold px-4 py-3 rounded-xl border-[1.5px] transition-all ${
                value === o.v
                  ? "bg-[#EFEDFE] border-[#6D5EF5] text-[#5847E8]"
                  : "bg-white border-[#E7E4DD] text-[#1B1730] hover:border-[#6D5EF5]"
              } ${o.warn ? "border-dashed" : ""}`}
            >
              {o.l}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (type === "checkbox-list") {
    return (
      <div>
        {labelEl}
        <div className="flex flex-col gap-2">
          {options.map((opt, i) => (
            <label
              key={i}
              className="flex items-center gap-2.5 text-[13px] text-[#1B1730] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={value[i]}
                onChange={() => {
                  const next = [...value];
                  next[i] = !next[i];
                  onChange(next);
                }}
                className="w-4 h-4 accent-[#6D5EF5] cursor-pointer"
              />
              {opt}
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (type === "chips-multiselect") {
    return (
      <div>
        {labelEl}
        <div className="flex flex-wrap gap-2">
          {options.map((o) => {
            const selected = value.includes(o);
            return (
              <button
                key={o}
                type="button"
                onClick={() => {
                  const next = selected
                    ? value.filter((v) => v !== o)
                    : [...value, o];
                  onChange(next);
                }}
                className={`text-[12px] font-semibold px-3 py-1.5 rounded-full border-[1.5px] transition-all ${
                  selected
                    ? "bg-[#EFEDFE] border-[#6D5EF5] text-[#5847E8]"
                    : "bg-white border-[#E7E4DD] text-[#767085] hover:border-[#6D5EF5]"
                }`}
              >
                {o}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (type === "number") {
    return (
      <div>
        {labelEl}
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="w-full text-[13.5px] font-medium text-[#1B1730] bg-white border-[1.5px] border-[#E7E4DD] rounded-[9px] px-3 py-2.5 focus:outline-none focus:border-[#6D5EF5]"
          />
          {unit && (
            <span className="text-[11px] text-[#A29CB5] whitespace-nowrap">{unit}</span>
          )}
        </div>
      </div>
    );
  }

  if (type === "date") {
    return (
      <div>
        {labelEl}
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full text-[13.5px] font-medium text-[#1B1730] bg-white border-[1.5px] border-[#E7E4DD] rounded-[9px] px-3 py-2.5 focus:outline-none focus:border-[#6D5EF5]"
        />
      </div>
    );
  }

  return null;
}   