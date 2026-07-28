import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, UploadCloud, History as HistoryIcon, LogOut, ScanLine as ScanIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/upload", label: "Upload", icon: UploadCloud },
  { to: "/history", label: "History", icon: HistoryIcon },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const initials = (user?.name || "?")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col justify-between bg-ink px-5 py-6">
      <div>
        <div className="mb-10 flex items-center gap-2.5 px-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-scan/15 ring-1 ring-inset ring-scan/30">
            <ScanIcon className="h-4 w-4 text-scan" strokeWidth={2.25} />
          </div>
          <span className="font-display text-lg tracking-tight text-paper">ResumeIQ</span>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all duration-150 ${
                    isActive
                      ? "bg-ink-soft text-paper"
                      : "text-paper/55 hover:bg-ink-soft/60 hover:text-paper/90"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`absolute -left-5 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-scan transition-opacity duration-150 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                    {item.label}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-white/10 pt-4">
        <div className="mb-3 flex items-center gap-2.5 px-1">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper/10 font-mono text-xs text-paper/80">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm text-paper">{user?.name}</p>
            <p className="truncate font-mono text-[11px] text-paper/35">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-left text-xs uppercase tracking-wide text-paper/60 transition-colors duration-150 hover:border-white/25 hover:text-paper"
        >
          <LogOut className="h-3.5 w-3.5" strokeWidth={1.75} />
          Log out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
