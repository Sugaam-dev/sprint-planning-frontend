import React from "react";

// Generic full-area loading state. Pass `label` to describe what's loading.
const Loader = ({ label = "Loading..." }) => {
  return (
    <div className="min-h-[40vh] flex items-center justify-center text-slate-400 text-sm font-medium">
      {label}
    </div>
  );
};

export default Loader;