import { Target } from "lucide-react";

const JdTailoringTips = ({ tips = [] }) => {
  if (tips.length === 0) return null;

  return (
    <div className="rounded-md border border-scan/25 bg-scan-light/30 p-5">
      <div className="mb-3 flex items-center gap-1.5">
        <Target className="h-3.5 w-3.5 text-scan-dark" strokeWidth={2} />
        <p className="text-xs uppercase tracking-wide text-scan-dark">
          Tailored for this job description
        </p>
      </div>
      <ul className="space-y-2.5">
        {tips.map((tip, i) => (
          <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-ink900">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-scan-dark" />
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JdTailoringTips;
