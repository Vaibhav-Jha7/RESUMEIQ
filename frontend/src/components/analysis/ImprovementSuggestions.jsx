import { Lightbulb } from "lucide-react";

const ImprovementSuggestions = ({ suggestions = [] }) => {
  if (suggestions.length === 0) return null;

  return (
    <div>
      <div className="mb-4 flex items-center gap-1.5">
        <Lightbulb className="h-3.5 w-3.5 text-flag" strokeWidth={2} />
        <p className="text-xs uppercase tracking-wide text-muted">
          Improvement suggestions
        </p>
      </div>
      <ol className="space-y-3">
        {suggestions.map((tip, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink900">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-flag-light font-mono text-[11px] text-flag">
              {i + 1}
            </span>
            {tip}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ImprovementSuggestions;
