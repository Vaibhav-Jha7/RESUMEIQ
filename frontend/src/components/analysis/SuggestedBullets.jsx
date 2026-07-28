import { ArrowRight, PenLine } from "lucide-react";

const SuggestedBullets = ({ bullets = [] }) => {
  if (bullets.length === 0) return null;

  return (
    <div>
      <div className="mb-4 flex items-center gap-1.5">
        <PenLine className="h-3.5 w-3.5 text-ink900/60" strokeWidth={2} />
        <p className="text-xs uppercase tracking-wide text-muted">
          Bullet point rewrites
        </p>
      </div>
      <div className="space-y-4">
        {bullets.map((b, i) => (
          <div key={i} className="rounded-md border border-paper-line p-4">
            {b.section && (
              <p className="mb-2.5 font-mono text-[11px] uppercase tracking-wide text-muted">
                {b.section}
              </p>
            )}
            <div className="flex gap-2.5">
              <span className="mt-0.5 shrink-0 rounded-md bg-alert-light px-1.5 py-0.5 font-mono text-[10px] uppercase text-alert">
                Before
              </span>
              <p className="text-sm leading-relaxed text-muted line-through decoration-alert/30">
                {b.original}
              </p>
            </div>
            <div className="my-2.5 flex items-center gap-2 pl-1 text-muted/40">
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </div>
            <div className="flex gap-2.5">
              <span className="mt-0.5 shrink-0 rounded-md bg-scan-light px-1.5 py-0.5 font-mono text-[10px] uppercase text-scan-dark">
                After
              </span>
              <p className="text-sm font-medium leading-relaxed text-ink900">
                {b.improved}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedBullets;
