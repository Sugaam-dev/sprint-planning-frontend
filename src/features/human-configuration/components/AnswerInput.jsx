import { useState } from "react";

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
    <label className="flex items-end min-h-[30px] text-[11.5px] font-semibold text-[#767085] mb-1.5 leading-tight">
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

  if (type === "date-pair") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((f) => (
          <div key={f.k}>
            <label className="flex items-end min-h-[30px] text-[11.5px] font-semibold text-[#767085] mb-1.5 leading-tight">
              {f.l}
            </label>
            <input
              type="date"
              value={value[f.k] || ""}
              onChange={(e) => onChange({ ...value, [f.k]: e.target.value })}
              className="w-full text-[13.5px] font-medium text-[#1B1730] bg-white border-[1.5px] border-[#E7E4DD] rounded-[9px] px-3 py-2.5 focus:outline-none focus:border-[#6D5EF5]"
            />
          </div>
        ))}
      </div>
    );
  }

  if (type === "hours-grid") {
    return <HoursGrid label={label} fields={options} value={value} onChange={onChange} />;
  }

  if (type === "toggle-rows") {
    return (
      <div>
        {labelEl}
        <div className="flex flex-col gap-3">
          {options.map((row) => (
            <div key={row.k} className="flex items-center justify-between gap-3">
              <span className="text-[12.5px] text-[#1B1730] flex-1">{row.l}</span>
              <div className="flex gap-1.5">
                {row.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => onChange({ ...value, [row.k]: opt })}
                    className={`text-[11.5px] font-semibold px-3 py-1.5 rounded-full border-[1.5px] transition-all whitespace-nowrap ${
                      value[row.k] === opt
                        ? "bg-[#6D5EF5] border-[#6D5EF5] text-white"
                        : "bg-white border-[#E7E4DD] text-[#767085] hover:border-[#6D5EF5]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

    if (type === "calibration-info") {
    const rows = [
      ["1 SP", "Trivial", "Text/field change, simple CSS adjustment", "2 – 4 hrs"],
      ["2 SP", "Small / Standard", "Simple CRUD endpoint, standard UI form validation", "4 – 8 hrs"],
      ["3 SP", "Medium", "Multi-field API with DB migrations and unit tests", "8 – 16 hrs"],
      ["5 SP", "Complex", "Gateway integration, MFA, complex async event", "16 – 32 hrs"],
      ["8 SP", "High / Multi-module", "Full subsystem with cross-service dependencies", "32 – 50 hrs"],
      ["13+ SP", "Epic", "Unresolved external dependencies / multi-team", "Mandatory split"],
    ];
    return (
      <div>
        {labelEl}
        <div className="overflow-x-auto border border-[#E7E4DD] rounded-xl">
          <table className="w-full text-[12px] border-collapse">
            <thead>
              <tr className="bg-[#FAF9F6] text-left">
                <th className="px-3 py-2.5 font-semibold text-[#767085]">Points</th>
                <th className="px-3 py-2.5 font-semibold text-[#767085]">Complexity</th>
                <th className="px-3 py-2.5 font-semibold text-[#767085]">Typical scope</th>
                <th className="px-3 py-2.5 font-semibold text-[#767085]">Ideal hours</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-[#ECEFFA]">
                  {r.map((c, j) => (
                    <td key={j} className="px-3 py-2.5 text-[#1B1730]">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

    if (type === "resource-table") {
    return (
      <div>
        {labelEl}
        <div className="overflow-x-auto border border-[#E7E4DD] rounded-xl">
          <table className="w-full text-[12px] border-collapse">
            <thead>
              <tr className="bg-[#FAF9F6] text-left">
                {options.cols.map((c) => (
                  <th key={c[0]} className="px-3 py-2.5 font-semibold text-[#767085] whitespace-nowrap">
                    {c[1]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {value.map((row, i) => (
                <tr key={i} className="border-t border-[#ECEFFA]">
                  {row.map((cell, j) => (
                    <td key={j} className="px-1 py-1.5">
                      <input
                        value={cell}
                        onChange={(e) => {
                          const next = value.map((r) => [...r]);
                          next[i][j] = e.target.value;
                          onChange(next);
                        }}
                        className="w-full text-[12px] text-[#1B1730] bg-transparent px-2 py-1.5 rounded-md focus:outline-none focus:bg-white focus:border focus:border-[#6D5EF5]"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

    if (type === "date-list") {
    return (
      <div>
        {labelEl}
        <div className="flex flex-col gap-2">
          {value.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="date"
                value={d}
                onChange={(e) => {
                  const next = [...value];
                  next[i] = e.target.value;
                  onChange(next);
                }}
                className="flex-1 text-[13px] text-[#1B1730] bg-white border-[1.5px] border-[#E7E4DD] rounded-md px-3 py-2 focus:outline-none focus:border-[#6D5EF5]"
              />
              <button
                type="button"
                onClick={() => onChange(value.filter((_, j) => j !== i))}
                className="w-7 h-7 flex items-center justify-center text-[#A29CB5] hover:text-[#DC2626] rounded-full"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onChange([...value, ""])}
          className="mt-2 text-[12px] font-semibold text-[#6D5EF5] hover:underline"
        >
          + Add date
        </button>
      </div>
    );
  }

  if (type === "formula-info") {
    return (
      <div>
        {labelEl}
        <div className="bg-[#FAF9F6] border border-[#E7E4DD] rounded-xl p-4 font-mono text-[12.5px] text-[#1B1730] leading-relaxed">
          Net Capacity =<br />
          &nbsp;&nbsp;( Total Available Member Hours<br />
          &nbsp;&nbsp;&nbsp;&nbsp;− Planned Leaves<br />
          &nbsp;&nbsp;&nbsp;&nbsp;− Ceremonies )<br />
          &nbsp;&nbsp;× ( 1 − Buffer Margin )
        </div>
      </div>
    );
  }

    if (type === "number-pair") {
    return (
      <div>
        {labelEl}
        <div className="grid grid-cols-2 gap-4">
          {options.map((f) => (
            <div key={f.k}>
              <label className="block text-[11.5px] font-semibold text-[#767085] mb-1.5">
                {f.l}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={value[f.k] || ""}
                  placeholder={f.ph}
                  onChange={(e) => onChange({ ...value, [f.k]: e.target.value })}
                  className="w-full text-[13.5px] text-[#1B1730] bg-white border-[1.5px] border-[#E7E4DD] rounded-[9px] px-3 py-2.5 focus:outline-none focus:border-[#6D5EF5]"
                />
                <span className="text-[10.5px] text-[#A29CB5] whitespace-nowrap">{f.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

function HoursGrid({ label, fields, value, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="text-[12.5px] font-semibold text-[#6D5EF5] hover:underline"
      >
        {open ? "Hide" : "Show"} {label} {open ? "▲" : "▼"}
      </button>
      {open && (
        <div className="mt-3 flex flex-col gap-2.5 bg-[#FAF9F6] border border-[#E7E4DD] rounded-xl p-4">
          {fields.map((f) => (
            <div key={f.k} className="flex items-center justify-between gap-3">
              <span className="text-[12.5px] text-[#1B1730]">{f.l}</span>
              <div className="flex items-center gap-2 w-[140px]">
                <input
                  type="number"
                  value={value[f.k] || ""}
                  placeholder={f.ph}
                  onChange={(e) => onChange({ ...value, [f.k]: e.target.value })}
                  className="w-full text-[13px] text-right bg-white border border-[#E7E4DD] rounded-md px-2 py-1.5 focus:outline-none focus:border-[#6D5EF5]"
                />
                <span className="text-[10.5px] text-[#A29CB5] whitespace-nowrap">{f.unit}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}