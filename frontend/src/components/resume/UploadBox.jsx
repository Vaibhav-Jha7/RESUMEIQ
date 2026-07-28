import { useRef, useState } from "react";
import { UploadCloud, FileCheck2 } from "lucide-react";

const ACCEPTED = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const UploadBox = ({ onFileSelected, selectedFile }) => {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files) => {
    const file = files[0];
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) {
      alert("Only PDF and DOCX files are supported");
      return;
    }
    onFileSelected(file);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragActive(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      className={`group cursor-pointer rounded-lg border-2 border-dashed px-8 py-16 text-center transition-all duration-200 ${
        dragActive
          ? "border-scan bg-scan-light/40 scale-[1.01]"
          : selectedFile
          ? "border-scan/40 bg-scan-light/20"
          : "border-paper-line bg-paper-card/50 hover:border-ink/30 hover:bg-paper-card"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {selectedFile ? (
        <div className="flex flex-col items-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-scan-light">
            <FileCheck2 className="h-5 w-5 text-scan-dark" strokeWidth={1.75} />
          </div>
          <p className="font-mono text-sm text-ink900">{selectedFile.name}</p>
          <p className="mt-1 text-xs text-muted">
            {(selectedFile.size / 1024).toFixed(0)} KB — click to replace
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-ink/5 transition-transform duration-200 group-hover:scale-110">
            <UploadCloud className="h-5 w-5 text-ink900/70" strokeWidth={1.75} />
          </div>
          <p className="font-display text-xl text-ink900">
            Drop your resume here
          </p>
          <p className="mt-2 text-sm text-muted">
            or click to browse — PDF or DOCX, up to 5MB
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadBox;
