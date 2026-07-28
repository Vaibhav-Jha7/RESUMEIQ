import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import AppLayout from "../components/common/AppLayout";
import Loader from "../components/common/Loader";
import ResumeCard from "../components/resume/ResumeCard";
import {
  deleteAnalysisApi,
  deleteResumeApi,
  getAnalysesApi,
  getResumesApi,
} from "../api/resources";

const History = () => {
  const [resumes, setResumes] = useState([]);
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAll = async () => {
    const [resumeRes, analysisRes] = await Promise.all([
      getResumesApi(),
      getAnalysesApi(),
    ]);
    setResumes(resumeRes.data.resumes);
    setAnalyses(analysisRes.data.analyses);
    setLoading(false);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleDeleteResume = async (id) => {
    await deleteResumeApi(id);
    setResumes((prev) => prev.filter((r) => r._id !== id));
  };

  const handleDeleteAnalysis = async (id) => {
    await deleteAnalysisApi(id);
    setAnalyses((prev) => prev.filter((a) => a._id !== id));
  };

  if (loading) {
    return (
      <AppLayout>
        <Loader label="Loading history" />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <p className="font-mono text-xs uppercase tracking-widest text-scan">
        History
      </p>
      <h1 className="mt-2 font-display text-4xl tracking-tight text-ink900 text-balance">
        Everything you've uploaded
      </h1>

      <section className="mt-10">
        <h2 className="mb-3 text-xs uppercase tracking-wide text-muted">
          Resumes ({resumes.length})
        </h2>
        {resumes.length === 0 ? (
          <div className="card px-5 py-8 text-center text-sm text-muted">
            No resumes uploaded yet.
          </div>
        ) : (
          <div className="space-y-2">
            {resumes.map((r) => (
              <ResumeCard key={r._id} resume={r} onDelete={handleDeleteResume} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xs uppercase tracking-wide text-muted">
          Analyses ({analyses.length})
        </h2>
        {analyses.length === 0 ? (
          <div className="card px-5 py-8 text-center text-sm text-muted">
            No analyses run yet.
          </div>
        ) : (
          <div className="space-y-2">
            {analyses.map((a) => (
              <div key={a._id} className="card card-hover flex items-center justify-between px-4 py-3.5">
                <Link to={`/results/${a._id}`} className="min-w-0 flex-1">
                  <p className="truncate text-sm text-ink900">
                    {a.resume?.originalName}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-muted">
                    {new Date(a.createdAt).toLocaleDateString()}
                  </p>
                </Link>
                <div className="flex items-center gap-3">
                  <span className="tag bg-scan-light text-scan-dark">
                    {a.atsScore}/100
                  </span>
                  <button
                    onClick={() => handleDeleteAnalysis(a._id)}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-muted transition-colors duration-150 hover:bg-alert-light hover:text-alert"
                  >
                    <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </AppLayout>
  );
};

export default History;
