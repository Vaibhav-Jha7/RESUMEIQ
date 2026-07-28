import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppLayout from "../components/common/AppLayout";
import ScanLine from "../components/common/ScanLine";
import Loader from "../components/common/Loader";
import { getResumeByIdApi, runAnalysisApi } from "../api/resources";

const AnalyzeExisting = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getResumeByIdApi(resumeId).then(({ data }) => setResume(data.resume));
  }, [resumeId]);

  const handleAnalyze = async () => {
    setError("");
    setAnalyzing(true);
    try {
      const { data } = await runAnalysisApi(resumeId, jobDescription);
      navigate(`/results/${data.analysis._id}`);
    } catch (err) {
      setError(err.message);
      setAnalyzing(false);
    }
  };

  if (!resume) {
    return (
      <AppLayout>
        <Loader label="Loading resume" />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <p className="font-mono text-xs uppercase tracking-widest text-scan">
        Re-analyze
      </p>
      <h1 className="mt-2 font-display text-4xl tracking-tight text-ink900">
        {resume.originalName}
      </h1>

      <div className="mt-8 max-w-xl space-y-6">
        {analyzing ? (
          <ScanLine label="Running AI analysis" />
        ) : (
          <label className="block">
            <span className="field-label">Job description (optional)</span>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description to get a match score against it"
              rows={6}
              className="field-input resize-none"
            />
          </label>
        )}

        {error && (
          <p className="rounded-md bg-alert-light px-3 py-2 text-sm text-alert">
            {error}
          </p>
        )}

        <button onClick={handleAnalyze} disabled={analyzing} className="btn-primary">
          {analyzing ? "Working…" : "Run analysis"}
        </button>
      </div>
    </AppLayout>
  );
};

export default AnalyzeExisting;
