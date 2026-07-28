import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/auth/AuthLayout";
import FormField from "../components/auth/FormField";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout eyebrow="Sign in" title="Pick up where you left off.">
      <h2 className="mb-1 font-display text-2xl text-ink900">Log in</h2>
      <p className="mb-6 text-sm text-muted">
        Don't have an account?{" "}
        <Link to="/signup" className="text-ink900 underline underline-offset-2">
          Create one
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange("email")}
          placeholder="you@example.com"
        />
        <FormField
          label="Password"
          type="password"
          value={form.password}
          onChange={handleChange("password")}
          placeholder="••••••••"
        />

        {error && (
          <p className="rounded-md bg-alert-light px-3 py-2 text-sm text-alert">
            {error}
          </p>
        )}

        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? "Logging in…" : "Log in"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
