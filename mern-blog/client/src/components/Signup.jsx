import { useState } from "react";
import { api } from "../api";

export default function Signup({ onAuth, goLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setBusy(true);
    try {
      const data = await api("/auth/signup", { method: "POST", body: form });
      onAuth(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="card">
        <h2>Sign up</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={submit}>
          <input placeholder="Name" value={form.name} onChange={set("name")} required />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={set("email")}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={set("password")}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={set("confirmPassword")}
            required
          />
          <button type="submit" disabled={busy}>
            {busy ? "Creating account..." : "Signup"}
          </button>
        </form>
        <p className="muted" style={{ marginBottom: 0 }}>
          Already registered?{" "}
          <button className="linkish" onClick={goLogin}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
