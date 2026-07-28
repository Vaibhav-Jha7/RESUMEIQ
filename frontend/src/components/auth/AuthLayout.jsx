import { ScanLine } from "lucide-react";

const AuthLayout = ({ eyebrow, title, children }) => (
  <div className="flex min-h-screen">
    <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-ink px-14 py-12 lg:flex">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #2AA37B, transparent 70%)" }}
      />

      <div className="relative flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-scan/15 ring-1 ring-inset ring-scan/30">
          <ScanLine className="h-4 w-4 text-scan" strokeWidth={2.25} />
        </div>
        <span className="font-display text-lg tracking-tight text-paper">ResumeIQ</span>
      </div>

      <div className="relative max-w-md">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-scan">
          {eyebrow}
        </p>
        <h1 className="font-display text-4xl leading-tight tracking-tight text-paper text-balance">
          {title}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-paper/55">
          Upload a resume and get an ATS score, keyword gaps against a job
          description, and section-by-section feedback in seconds with improvements suggestions.
        </p>
          <br />
          <br />
        <p className="mt-4 text-sm leading-relaxed text-paper/25">
           Upload your resume and  check score by   AI ✦
        </p>
          
      </div>


      <p className="relative font-mono text-xs text-paper/50">
        Build by : Vaibhav kumar Jha    
      </p>

    </div>
        
    <div className="flex w-full items-center justify-center bg-paper px-6 py-12 lg:w-1/2">
      <div className="w-full max-w-sm animate-fadeUp">{children}</div>
    </div>
  </div>
);

export default AuthLayout;
