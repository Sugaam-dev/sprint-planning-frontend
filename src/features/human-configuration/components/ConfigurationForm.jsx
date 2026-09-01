import { useState } from "react";
import QuestionCard from "./QuestionCard";
import AnswerInput from "./AnswerInput";
import { SECTIONS, getDefaultAnswers, isSectionComplete } from "../humanConfigData";

export default function ConfigurationForm({ onSave, initialMode = "essential" }) {
  const [mode, setMode] = useState(initialMode); // "essential" | "full"
  const [answers, setAnswers] = useState(getDefaultAnswers());

  const visibleSections =
    mode === "essential" ? SECTIONS.filter((s) => s.essential) : SECTIONS;

  function updateAnswer(key, value) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function handleReset() {
    setAnswers(getDefaultAnswers());
  }

  function handleSave() {
    onSave?.(answers);
  }

  return (
    <div className="max-w-[720px] mx-auto">
      {/* Mode switch */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#1B1730]">Human Configuration</h1>
          <p className="text-[13px] text-[#767085] mt-1">
            Tell us how your team works so the AI can plan accordingly.
          </p>
        </div>
        <div className="flex items-center bg-white border-[1.5px] border-[#E7E4DD] rounded-full p-1">
          <button
            type="button"
            onClick={() => setMode("essential")}
            className={`text-[12.5px] font-semibold px-4 py-1.5 rounded-full transition-all ${
              mode === "essential" ? "bg-[#6D5EF5] text-white" : "text-[#767085]"
            }`}
          >
            Essential
          </button>
          <button
            type="button"
            onClick={() => setMode("full")}
            className={`text-[12.5px] font-semibold px-4 py-1.5 rounded-full transition-all ${
              mode === "full" ? "bg-[#6D5EF5] text-white" : "text-[#767085]"
            }`}
          >
            Full
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-4">
        {visibleSections.map((section, i) => (
          <QuestionCard
            key={section.id}
            number={i + 1}
            title={section.title}
            subtitle={section.subtitle}
            complete={isSectionComplete(section, answers)}
          >
            <div className="flex flex-col gap-5">
              {section.fields.map((field) => (
                <AnswerInput
                  key={field.key}
                  type={field.type}
                  label={field.label}
                  value={answers[field.key]}
                  onChange={(v) => updateAnswer(field.key, v)}
                  options={field.options}
                  unit={field.unit}
                />
              ))}
            </div>
          </QuestionCard>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between mt-7 pt-5 border-t border-[#ECEFFA]">
        <button
          type="button"
          onClick={handleReset}
          className="text-[13px] font-semibold text-[#767085] hover:text-[#1B1730] transition-colors"
        >
          Reset to defaults
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="text-[13.5px] font-bold text-white bg-gradient-to-br from-[#6D5EF5] to-[#9333EA] px-6 py-3 rounded-full shadow-[0_10px_24px_-8px_rgba(109,94,245,0.5)] hover:brightness-105 hover:-translate-y-px transition-all"
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
}