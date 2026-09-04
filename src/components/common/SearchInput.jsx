import React from "react";
import { Search } from "lucide-react";

// Generic reusable search box. Purely controlled — the parent owns the
// `value` state and filtering logic. Used on Projects, Users, etc.
const SearchInput = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="relative flex-1">
      <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-700 placeholder:text-slate-400 shadow-sm outline-none focus:ring-2 focus:ring-indigo-300"
      />
    </div>
  );
};

export default SearchInput;