import { useEffect, useState } from "react";
import { api, getToken, setToken, clearToken } from "./api";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import BlogPage from "./components/BlogPage.jsx";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("login");

  useEffect(() => {
    if (!getToken()) {
      setLoading(false);
      return;
    }
    api("/auth/me")
      .then((d) => setUser(d.user))
      .catch(() => clearToken())
      .finally(() => setLoading(false));
  }, []);

  function onAuth({ token, user }) {
    setToken(token);
    setUser(user);
  }

  function logout() {
    clearToken();
    setUser(null);
    setView("login");
  }

  if (loading) return <p className="auth-wrap muted">Loading...</p>;

  if (!user) {
    return view === "login" ? (
      <Login onAuth={onAuth} goSignup={() => setView("signup")} />
    ) : (
      <Signup onAuth={onAuth} goLogin={() => setView("login")} />
    );
  }

  return <BlogPage user={user} onLogout={logout} />;
}
