import Sidebar from "./Sidebar";

const AppLayout = ({ children }) => (
  <div className="flex min-h-screen bg-paper">
    <Sidebar />
    <main className="relative flex-1 overflow-y-auto">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(600px 200px at 15% 0%, rgba(42,163,123,0.10), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-10 py-10">{children}</div>
    </main>
  </div>
);

export default AppLayout;
