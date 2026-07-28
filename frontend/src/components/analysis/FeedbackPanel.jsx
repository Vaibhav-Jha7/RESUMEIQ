const FeedbackPanel = ({ strengths = [], weaknesses = [], sectionFeedback = {} }) => (
  <div className="space-y-8">
    <div className="grid gap-6 sm:grid-cols-2">
      <div>
        <p className="mb-2 text-xs uppercase tracking-wide text-scan-dark">Strengths</p>
        <ul className="space-y-2">
          {strengths.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-ink900">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-scan" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="mb-2 text-xs uppercase tracking-wide text-alert">
          Needs work
        </p>
        <ul className="space-y-2">
          {weaknesses.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-ink900">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-alert" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>

    {Object.keys(sectionFeedback).length > 0 && (
      <div>
        <p className="mb-3 text-xs uppercase tracking-wide text-muted">
          Section-by-section notes
        </p>
        <div className="divide-y divide-paper-line rounded-md border border-paper-line">
          {Object.entries(sectionFeedback).map(([section, note]) => (
            <div key={section} className="px-4 py-3">
              <p className="mb-1 font-mono text-xs uppercase text-ink900">{section}</p>
              <p className="text-sm leading-relaxed text-muted">{note}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default FeedbackPanel;
