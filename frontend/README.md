# AI Resume Analyzer — Frontend

React (Vite) + Tailwind CSS. Talks to the backend API via cookie-based auth.

## Setup

```bash
cd frontend
npm install
cp .env.example .env   # point VITE_API_URL at your backend
npm run dev
```

Runs on `http://localhost:5173`. Make sure the backend's `CLIENT_URL` matches
this origin so CORS + cookies work.

## Pages

| Route | Page | Auth |
|---|---|---|
| `/login` | Log in | No |
| `/signup` | Create account | No |
| `/dashboard` | Recent resumes + analyses | Yes |
| `/upload` | Upload a resume, optionally paste a job description, run analysis | Yes |
| `/analyze/:resumeId` | Re-run analysis on an existing resume | Yes |
| `/results/:id` | ATS score, job match, keyword gaps, feedback | Yes |
| `/history` | Full list of resumes and analyses, with delete | Yes |

## Design

- **Palette**: ink navy (`#121826`) for structure/nav, warm-neutral paper
  (`#F7F6F1`) for content, teal-green (`#2AA37B`) as the primary "pass"
  accent, amber/red for flagged and missing items.
- **Type**: Fraunces (serif, display only) for headlines, Inter for body
  copy, JetBrains Mono for scores, filenames, and keyword tags — reinforces
  the "machine reading a document" theme.
- **Signature element**: the `ScanLine` component — a sweeping highlight
  over placeholder text lines, shown while a resume is uploading or being
  analyzed, echoing an ATS/scanner pass over the document.

## Folder structure

```
frontend/
├── src/
│   ├── api/              axiosInstance.js, resources.js (all API calls)
│   ├── context/          AuthContext.jsx
│   ├── components/
│   │   ├── common/       AppLayout, Sidebar, ProtectedRoute, Loader, ScanLine
│   │   ├── auth/         AuthLayout, FormField
│   │   ├── resume/       UploadBox, ResumeCard
│   │   └── analysis/     ScoreGauge, KeywordList, FeedbackPanel
│   ├── pages/             Login, Signup, Dashboard, UploadResume,
│   │                      AnalyzeExisting, AnalysisResult, History
│   ├── routes/            AppRoutes.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
└── package.json
```
