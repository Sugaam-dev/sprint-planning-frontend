import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#eef0f7] flex flex-col items-center justify-center gap-3">
      <h1 className="text-3xl font-bold text-slate-900">404</h1>
      <p className="text-slate-500">This page doesn't exist.</p>
      <Link to="/" className="text-sm text-indigo-600 font-semibold">
        ← Back home
      </Link>
    </div>
  );
};

export default NotFound;