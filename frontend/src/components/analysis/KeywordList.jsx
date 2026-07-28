import { CheckCircle2, XCircle } from "lucide-react";

const KeywordList = ({ matched = [], missing = [] }) => (
  <div className="grid gap-6 sm:grid-cols-2">
    <div>
      <div className="mb-2.5 flex items-center gap-1.5">
        <CheckCircle2 className="h-3.5 w-3.5 text-scan-dark" strokeWidth={2} />
        <p className="text-xs uppercase tracking-wide text-muted">
          Matched keywords
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {matched.length === 0 && (
          <span className="text-sm text-muted">None found</span>
        )}
        {matched.map((kw) => (
          <span key={kw} className="tag bg-scan-light text-scan-dark">
            {kw}
          </span>
        ))}
      </div>
    </div>

    <div>
      <div className="mb-2.5 flex items-center gap-1.5">
        <XCircle className="h-3.5 w-3.5 text-alert" strokeWidth={2} />
        <p className="text-xs uppercase tracking-wide text-muted">
          Missing keywords
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {missing.length === 0 && (
          <span className="text-sm text-muted">None — good coverage</span>
        )}
        {missing.map((kw) => (
          <span key={kw} className="tag bg-alert-light text-alert">
            {kw}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default KeywordList;
