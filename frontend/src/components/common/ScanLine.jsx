// The signature visual motif: a thin scan line sweeping down a document,
// echoing an ATS system "reading" the resume. Used anywhere we're waiting
// on parsing or AI analysis.
const ScanLine = ({ label = "Scanning" }) => (
  <div className="relative overflow-hidden rounded-md border border-paper-line bg-paper-card shadow-[0_1px_2px_rgba(18,24,38,0.04),0_10px_24px_-16px_rgba(18,24,38,0.25)]">
    <div className="space-y-2.5 p-7">
      {[100, 88, 95, 70, 82, 60].map((w, i) => (
        <div
          key={i}
          className="h-2.5 rounded-full bg-paper-line/80"
          style={{ width: `${w}%` }}
        />
      ))}
    </div>
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-scan/30 via-scan/10 to-transparent animate-scanline"
      style={{ animationDuration: "1.8s" }}
    />
    <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 shadow-[0_4px_12px_-4px_rgba(18,24,38,0.4)]">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-scan opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-scan" />
      </span>
      <span className="font-mono text-[11px] uppercase tracking-wide text-paper">
        {label}
      </span>
    </div>
  </div>
);

export default ScanLine;
