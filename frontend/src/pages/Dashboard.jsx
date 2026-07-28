import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileStack, ScanSearch, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import AppLayout from "../components/common/AppLayout";
import Loader from "../components/common/Loader";
import ResumeCard from "../components/resume/ResumeCard";
import { useAuth } from "../context/AuthContext";
import { getAnalysesApi, getResumesApi } from "../api/resources";

const Dashboard = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [resumeRes, analysisRes] = await Promise.all([
          getResumesApi(),
          getAnalysesApi(),
        ]);
        setResumes(resumeRes.data.resumes);
        setAnalyses(analysisRes.data.analyses);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const avgScore = analyses.length
    ? Math.round(analyses.reduce((sum, a) => sum + a.atsScore, 0) / analyses.length)
    : null;

  const stats = [
    {
      label: "Resumes uploaded",
      value: resumes.length,
      icon: FileStack,
      tint: "bg-ink/5 text-ink900/70",
    },
    {
      label: "Analyses run",
      value: analyses.length,
      icon: ScanSearch,
      tint: "bg-scan-light text-scan-dark",
    },
    {
      label: "Average ATS score",
      value: avgScore !== null ? `${avgScore}/100` : "—",
      icon: TrendingUp,
      tint: "bg-flag-light text-flag",
    },
  ];

  return (
    <AppLayout>
      <div className="flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-scan" strokeWidth={2} />
        <p className="font-mono text-xs uppercase tracking-widest text-scan">
          Dashboard
        </p>
      </div>
      <h1 className="mt-2 font-display text-4xl tracking-tight text-ink900 text-balance">
        Welcome back, {user?.name?.split(" ")[0]}
      </h1>
      <p className="mt-2 max-w-md text-sm text-muted">
        Here's how your resumes are scoring against the ATS.
      </p>

      <div className="mt-6 flex gap-3">
        <Link to="/upload" className="btn-primary">
          <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
          Analyze a new resume
        </Link>
        <Link to="/history" className="btn-secondary">
          View full history
        </Link>
      </div>

      {loading ? (
        <div className="mt-12">
          <Loader label="Loading your data" />
        </div>
      ) : (
        <>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="stat-card">
                  <div className={`icon-tile ${s.tint}`}>
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-mono text-2xl text-ink900">{s.value}</p>
                    <p className="text-xs text-muted">{s.label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <section>
              <h2 className="mb-3 text-xs uppercase tracking-wide text-muted">
                Recent resumes
              </h2>
              {resumes.length === 0 ? (
                <div className="card px-5 py-8 text-center">
                  <p className="text-sm text-muted">
                    No resumes uploaded yet.
                  </p>
                  <Link
                    to="/upload"
                    className="mt-2 inline-flex items-center gap-1 text-sm text-ink900 underline underline-offset-2"
                  >
                    Upload your first one <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {resumes.slice(0, 3).map((r) => (
                    <ResumeCard key={r._id} resume={r} />
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="mb-3 text-xs uppercase tracking-wide text-muted">
                Recent analyses
              </h2>
              {analyses.length === 0 ? (
                <div className="card px-5 py-8 text-center">
                  <p className="text-sm text-muted">No analyses run yet.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {analyses.slice(0, 3).map((a) => (
                    <Link
                      key={a._id}
                      to={`/results/${a._id}`}
                      className="card card-hover flex items-center justify-between px-4 py-3.5"
                    >
                      <span className="truncate text-sm text-ink900">
                        {a.resume?.originalName}
                      </span>
                      <span className="tag bg-scan-light text-scan-dark">
                        {a.atsScore}/100
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </div>
        </>
      )}
    </AppLayout>
  );
};

export default Dashboard;
