import React from "react";

// Generic error state with a retry action. Used whenever a fetch fails.
const ErrorState = ({ message = "Something went wrong.", onRetry }) => {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3 text-slate-500 text-sm">
      <p>{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorState;