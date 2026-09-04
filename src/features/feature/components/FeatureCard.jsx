import React from "react";
import { Target } from "lucide-react";

const COLOR_THEMES = {
  violet: { iconBg: "bg-gradient-to-br from-violet-500 to-purple-600", bar: "bg-violet-500", cardBg: "bg-white" },
  rose: { iconBg: "bg-gradient-to-br from-pink-500 to-rose-500", bar: "bg-rose-500", cardBg: "bg-rose-50/60" },
  sky: { iconBg: "bg-gradient-to-br from-sky-500 to-blue-500", bar: "bg-sky-500", cardBg: "bg-sky-50/60" },
  amber: { iconBg: "bg-gradient-to-br from-amber-500 to-orange-500", bar: "bg-amber-500", cardBg: "bg-amber-50/60" },
};

const FeatureCard = ({ feature }) => {
  const theme = COLOR_THEMES[feature.color] || COLOR_THEMES.violet;

  return (
    <div className={`rounded-2xl shadow-sm p-5 flex flex-col ${theme.cardBg}`}>
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${theme.iconBg}`}>
          <Target className="w-5 h-5 text-white" />
        </div>
        <span className="bg-white text-xs font-semibold text-slate-600 px-3 py-1 rounded-full shadow-sm">
          {feature.stories} {feature.stories === 1 ? "story" : "stories"}
        </span>
      </div>

      <h3 className="text-base font-bold text-slate-900 mt-4 leading-snug">
        {feature.title}
      </h3>
      <p className="text-sm text-slate-500 mt-2 leading-relaxed line-clamp-3">
        {feature.description}
      </p>

      <div className="mt-auto pt-4">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1.5">
          <span>{feature.points} pts</span>
          <span>{feature.percentDone}% done</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
          <div className={`h-full rounded-full ${theme.bar}`} style={{ width: `${feature.percentDone}%` }} />
        </div>
        <p className="text-xs text-slate-400 mt-2">
          {feature.dor} DoR &middot; {feature.dod} DoD
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;