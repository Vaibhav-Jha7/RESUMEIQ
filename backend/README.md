# AI Resume Analyzer — Backend

Node.js + Express + MongoDB backend. Handles auth, resume upload/parsing, and AI-powered analysis.

## Setup

```bash
cd backend
npm install
cp .env.example .env   # then fill in MONGO_URI, JWT_SECRET, ANTHROPIC_API_KEY
npm run dev             # nodemon, auto-restarts on changes
# or
npm start
```

Server runs on `http://localhost:5000` by default. Health check: `GET /api/health`.

## Environment variables (`.env`)

| Variable | Description |
|---|---|
| `PORT` | Port the API listens on |
| `NODE_ENV` | `development` or `production` |
| `CLIENT_URL` | Frontend origin, used for CORS |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Long random string for signing JWTs |
| `JWT_EXPIRES_IN` | Token lifetime, e.g. `7d` |
| `GEMINI_API_KEY` | API key for Google Gemini (free tier available in Google AI Studio) |
| `AI_MODEL` | Model name, e.g. `gemini-2.5-flash` |
| `MAX_FILE_SIZE_MB` | Max resume upload size |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

## API reference

All protected routes require the `token` httpOnly cookie set at login, or an
`Authorization: Bearer <token>` header.

### Auth — `/api/auth`
| Method | Route | Body | Auth |
|---|---|---|---|
| POST | `/signup` | `{ name, email, password }` | No |
| POST | `/login` | `{ email, password }` | No |
| POST | `/logout` | — | No |
| GET | `/me` | — | Yes |

### Resumes — `/api/resumes`
| Method | Route | Body | Auth |
|---|---|---|---|
| POST | `/upload` | `multipart/form-data`, field `resume` (PDF/DOCX) | Yes |
| GET | `/` | — | Yes |
| GET | `/:id` | — | Yes |
| DELETE | `/:id` | — | Yes |

### Analysis — `/api/analysis`
| Method | Route | Body | Auth |
|---|---|---|---|
| POST | `/:resumeId` | `{ jobDescription?: string }` | Yes |
| GET | `/` | — | Yes |
| GET | `/:id` | — | Yes |
| DELETE | `/:id` | — | Yes |
| POST | `/compare` | `{ analysisIds: string[] }` | Yes |

## Folder structure

```
backend/
├── src/
│   ├── config/db.js
│   ├── models/          User, Resume, Analysis
│   ├── controllers/     authController, resumeController, analysisController
│   ├── routes/          authRoutes, resumeRoutes, analysisRoutes
│   ├── middleware/       authMiddleware, uploadMiddleware, errorMiddleware
│   ├── services/          parserService (PDF/DOCX text extraction), storageService (Cloudinary), aiService (Claude API call)
│   ├── utils/            generateToken, asyncHandler
│   ├── app.js            Express app + middleware wiring
│   └── server.js         entry point
├── .env.example
└── package.json
```

## Notes

- **AI response fields**: besides `atsScore`/`matchScore`/keywords, each
  `Analysis` document also stores `improvementSuggestions` (actionable
  overall fixes), `suggestedBullets` (before/after rewrites of weak lines
  pulled from the actual resume), and `jdTailoringTips` (specific advice for
  matching the resume to the supplied job description — empty if no JD was
  given). See the schema comments in `models/Analysis.js` and the prompt in
  `services/aiService.js` for exactly what's requested from the model.

- **File storage**: resumes are uploaded to Cloudinary as `raw` resources.
  `uploadMiddleware.js` uses multer's memory storage (no local disk writes),
  `storageService.js` streams the buffer to Cloudinary and returns a
  `secure_url` + `public_id`. The `public_id` is stored on the `Resume`
  document (`fileName` field) so the file can be deleted later. Create a
  free Cloudinary account and drop the three credentials into `.env`.
- The AI call in `services/aiService.js` targets the Google Gemini API
  (`generativelanguage.googleapis.com`), using `gemini-3.1-flash-lite` by
  default — free to use for development within Google's free-tier rate
  limits (get a key at https://aistudio.google.com/apikey).
  `responseMimeType: "application/json"` is set in the request so Gemini
  returns clean JSON. **Google rotates which models are free/available to
  new API keys every few months** — if you get a 404 saying a model is "no
  longer available to new users", check the model list on the AI Studio
  page above and update `AI_MODEL` in `.env`; no code changes needed.
  Swap the `fetch` call and URL if you'd rather use OpenAI or Anthropic
  instead — the rest of the pipeline (prompt, JSON parsing, schema) stays
  the same.
- Passwords are hashed with bcrypt; the JWT is stored in an httpOnly cookie
  to reduce XSS risk compared to localStorage.
