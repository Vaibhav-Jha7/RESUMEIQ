import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/auth/AuthLayout";
import FormField from "../components/auth/FormField";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signup(form.name, form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout eyebrow="Get started" title="Know what a recruiter's ATS sees.">
      <h2 className="mb-1 font-display text-2xl text-ink900">Create an account</h2>
      <p className="mb-6 text-sm text-muted">
        Already have one?{" "}
        <Link to="/login" className="text-ink900 underline underline-offset-2">
          Log in
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Name"
          value={form.name}
          onChange={handleChange("name")}
          placeholder="Jane Doe"
        />
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
          placeholder="At least 6 characters"
        />

        {error && (
          <p className="rounded-md bg-alert-light px-3 py-2 text-sm text-alert">
            {error}
          </p>
        )}

        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Signup;
