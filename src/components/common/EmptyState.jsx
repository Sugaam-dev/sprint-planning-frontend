import React from "react";

// Generic "nothing here" state — empty search results, empty lists, etc.
const EmptyState = ({ message = "Nothing to show yet." }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm py-16 text-center text-slate-400">
      {message}
    </div>
  );
};

export default EmptyState;