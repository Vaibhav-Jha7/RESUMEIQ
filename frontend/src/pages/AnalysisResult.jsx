import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import AppLayout from "../components/common/AppLayout";
import Loader from "../components/common/Loader";
import ScoreGauge from "../components/analysis/ScoreGauge";
import KeywordList from "../components/analysis/KeywordList";
import FeedbackPanel from "../components/analysis/FeedbackPanel";
import ImprovementSuggestions from "../components/analysis/ImprovementSuggestions";
import SuggestedBullets from "../components/analysis/SuggestedBullets";
import JdTailoringTips from "../components/analysis/JdTailoringTips";
import { getAnalysisByIdApi } from "../api/resources";

const AnalysisResult = () => {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getAnalysisByIdApi(id)
      .then(({ data }) => setAnalysis(data.analysis))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <AppLayout>
        <p className="rounded-md bg-alert-light px-3 py-2 text-sm text-alert">{error}</p>
      </AppLayout>
    );
  }

  if (!analysis) {
    return (
      <AppLayout>
        <Loader label="Loading analysis" />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Link
        to="/history"
        className="mb-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted transition-colors hover:text-ink900"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        Back to history
      </Link>

      <p className="font-mono text-xs uppercase tracking-widest text-scan">
        Analysis result
      </p>
      <div className="mt-2 flex items-center gap-2.5">
        <FileText className="h-6 w-6 text-ink900/50" strokeWidth={1.5} />
        <h1 className="font-display text-3xl tracking-tight text-ink900">
          {analysis.resume?.originalName}
        </h1>
      </div>
      <p className="mt-1 text-xs text-muted">
        {new Date(analysis.createdAt).toLocaleString()}
      </p>

      <div className="card mt-8 flex flex-wrap gap-10 p-7">
        <ScoreGauge score={analysis.atsScore} label="ATS score" />
        {analysis.matchScore !== null && (
          <ScoreGauge score={analysis.matchScore} label="Job match" />
        )}
      </div>

      {analysis.jdTailoringTips?.length > 0 && (
        <div className="mt-8">
          <JdTailoringTips tips={analysis.jdTailoringTips} />
        </div>
      )}

      {(analysis.matchedKeywords.length > 0 || analysis.missingKeywords.length > 0) && (
        <div className="card mt-8 p-7">
          <KeywordList
            matched={analysis.matchedKeywords}
            missing={analysis.missingKeywords}
          />
        </div>
      )}

      <div className="card mt-8 p-7">
        <FeedbackPanel
          strengths={analysis.strengths}
          weaknesses={analysis.weaknesses}
          sectionFeedback={analysis.sectionFeedback}
        />
      </div>

      {analysis.improvementSuggestions?.length > 0 && (
        <div className="card mt-8 p-7">
          <ImprovementSuggestions suggestions={analysis.improvementSuggestions} />
        </div>
      )}

      {analysis.suggestedBullets?.length > 0 && (
        <div className="card mt-8 p-7">
          <SuggestedBullets bullets={analysis.suggestedBullets} />
        </div>
      )}
    </AppLayout>
  );
};

export default AnalysisResult;
