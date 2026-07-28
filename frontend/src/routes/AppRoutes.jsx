import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import UploadResume from "../pages/UploadResume";
import AnalyzeExisting from "../pages/AnalyzeExisting";
import AnalysisResult from "../pages/AnalysisResult";
import History from "../pages/History";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />

    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/upload"
      element={
        <ProtectedRoute>
          <UploadResume />
        </ProtectedRoute>
      }
    />
    <Route
      path="/analyze/:resumeId"
      element={
        <ProtectedRoute>
          <AnalyzeExisting />
        </ProtectedRoute>
      }
    />
    <Route
      path="/results/:id"
      element={
        <ProtectedRoute>
          <AnalysisResult />
        </ProtectedRoute>
      }
    />
    <Route
      path="/history"
      element={
        <ProtectedRoute>
          <History />
        </ProtectedRoute>
      }
    />

    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
);

export default AppRoutes;
