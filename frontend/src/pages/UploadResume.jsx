import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/common/AppLayout";
import UploadBox from "../components/resume/UploadBox";
import ScanLine from "../components/common/ScanLine";
import { uploadResumeApi, runAnalysisApi } from "../api/resources";

const STEPS = { SELECT: "select", UPLOADING: "uploading", ANALYZING: "analyzing" };

const UploadResume = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [step, setStep] = useState(STEPS.SELECT);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!file) return;
    setError("");
    try {
      setStep(STEPS.UPLOADING);
      const { data: uploadData } = await uploadResumeApi(file);

      setStep(STEPS.ANALYZING);
      const { data: analysisData } = await runAnalysisApi(
        uploadData.resume._id,
        jobDescription
      );

      navigate(`/results/${analysisData.analysis._id}`);
    } catch (err) {
      setError(err.message);
      setStep(STEPS.SELECT);
    }
  };

  const busy = step !== STEPS.SELECT;

  return (
    <AppLayout>
      <p className="font-mono text-xs uppercase tracking-widest text-scan">
        New analysis
      </p>
      <h1 className="mt-2 font-display text-4xl tracking-tight text-ink900">
        Upload a resume
      </h1>
      <p className="mt-2 max-w-lg text-sm text-muted">
        We'll extract the text, score it for ATS-friendliness, and — if you
        paste a job description below — match it against that role too.
      </p>

      <div className="mt-8 max-w-xl space-y-6">
        {busy ? (
          <ScanLine
            label={step === STEPS.UPLOADING ? "Uploading and parsing" : "Running AI analysis"}
          />
        ) : (
          <UploadBox onFileSelected={setFile} selectedFile={file} />
        )}

        <label className="block">
          <span className="field-label">Job description (optional)</span>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description to get a match score against it"
            rows={6}
            disabled={busy}
            className="field-input resize-none"
          />
        </label>

        {error && (
          <p className="rounded-md bg-alert-light px-3 py-2 text-sm text-alert">
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={!file || busy}
          className="btn-primary"
        >
          {busy ? "Working…" : "Run analysis"}
        </button>
      </div>
    </AppLayout>
  );
};

export default UploadResume;
