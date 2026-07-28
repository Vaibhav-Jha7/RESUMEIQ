import axiosInstance from "./axiosInstance";

// --- Auth ---
export const signupApi = (data) => axiosInstance.post("/auth/signup", data);
export const loginApi = (data) => axiosInstance.post("/auth/login", data);
export const logoutApi = () => axiosInstance.post("/auth/logout");
export const getMeApi = () => axiosInstance.get("/auth/me");

// --- Resumes ---
export const uploadResumeApi = (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append("resume", file);
  return axiosInstance.post("/resumes/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress,
  });
};
export const getResumesApi = () => axiosInstance.get("/resumes");
export const getResumeByIdApi = (id) => axiosInstance.get(`/resumes/${id}`);
export const deleteResumeApi = (id) => axiosInstance.delete(`/resumes/${id}`);

// --- Analysis ---
export const runAnalysisApi = (resumeId, jobDescription = "") =>
  axiosInstance.post(`/analysis/${resumeId}`, { jobDescription });
export const getAnalysesApi = () => axiosInstance.get("/analysis");
export const getAnalysisByIdApi = (id) => axiosInstance.get(`/analysis/${id}`);
export const deleteAnalysisApi = (id) => axiosInstance.delete(`/analysis/${id}`);
export const compareAnalysesApi = (analysisIds) =>
  axiosInstance.post("/analysis/compare", { analysisIds });
