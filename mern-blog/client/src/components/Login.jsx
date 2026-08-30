import { useState } from "react";
import { api } from "../api";

export default function Login({ onAuth, goSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const data = await api("/auth/login", { method: "POST", body: { email, password } });
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
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={busy}>
            {busy ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="muted" style={{ marginBottom: 0 }}>
          No account?{" "}
          <button className="linkish" onClick={goSignup}>
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
