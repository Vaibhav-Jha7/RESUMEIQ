const Loader = ({ label = "Loading" }) => (
  <div className="flex items-center gap-3 text-sm text-muted">
    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-paper-line border-t-ink" />
    <span className="font-mono text-xs uppercase tracking-wide">{label}</span>
  </div>
);

export default Loader;
