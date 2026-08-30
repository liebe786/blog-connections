import { useState } from "react";
import { api } from "../api";

export default function CreateBlog({ onCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await api("/blogs", { method: "POST", body: { title, content } });
      setTitle("");
      setContent("");
      onCreated();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="card">
      <h2>Create a Blog</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={submit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit" disabled={busy}>
          {busy ? "Publishing..." : "Publish"}
        </button>
      </form>
    </section>
  );
}
