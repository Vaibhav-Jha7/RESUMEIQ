import { Link } from "react-router-dom";
import { FileText, ArrowRight, Trash2 } from "lucide-react";

const ResumeCard = ({ resume, onDelete }) => (
  <div className="card card-hover flex items-center justify-between gap-4 px-4 py-3.5">
    <div className="flex min-w-0 items-center gap-3">
      <div className="icon-tile bg-ink/5 text-ink900/70">
        <FileText className="h-4 w-4" strokeWidth={1.75} />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm text-ink900">{resume.originalName}</p>
        <p className="mt-0.5 font-mono text-xs text-muted">
          {resume.fileType.toUpperCase()} · {new Date(resume.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
    <div className="flex shrink-0 items-center gap-1.5">
      <Link
        to={`/analyze/${resume._id}`}
        className="flex items-center gap-1.5 rounded-md border border-paper-line px-3 py-1.5 text-xs uppercase tracking-wide text-ink900 transition-all duration-150 hover:border-ink hover:bg-ink hover:text-paper"
      >
        Analyze
        <ArrowRight className="h-3 w-3" strokeWidth={2} />
      </Link>
      {onDelete && (
        <button
          onClick={() => onDelete(resume._id)}
          className="flex h-7 w-7 items-center justify-center rounded-md text-muted transition-colors duration-150 hover:bg-alert-light hover:text-alert"
        >
          <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
        </button>
      )}
    </div>
  </div>
);

export default ResumeCard;
