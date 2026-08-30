import { useCallback, useEffect, useState } from "react";
import { api } from "../api";
import CreateBlog from "./CreateBlog.jsx";
import BlogCard from "./BlogCard.jsx";
import FollowingSidebar from "./FollowingSidebar.jsx";

export default function BlogPage({ user, onLogout }) {
  const [blogs, setBlogs] = useState([]);
  const [following, setFollowing] = useState([]);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const [feed, follows] = await Promise.all([
        api("/blogs"),
        api("/users/following"),
      ]);
      setBlogs(feed);
      setFollowing(follows);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function toggleFollow(userId, isFollowing) {
    try {
      const data = await api(`/users/${userId}/follow`, {
        method: isFollowing ? "DELETE" : "POST",
      });
      setFollowing(data.following);
      const feed = await api("/blogs");
      setBlogs(feed);
    } catch (err) {
      setError(err.message);
    }
  }

  const followingIds = new Set(following.map((u) => String(u._id)));

  return (
    <>
      <header className="app-header">
        <h1>Blog App</h1>
        <div className="row" style={{ padding: 0 }}>
          <span className="muted">{user.name}</span>
          <button className="secondary" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="layout">
        <main>
          {error && <p className="error">{error}</p>}
          <CreateBlog onCreated={load} />
          {blogs.length === 0 ? (
            <p className="muted">No blogs yet. Publish the first one.</p>
          ) : (
            blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                isSelf={String(blog.author?._id) === String(user._id)}
                isFollowing={followingIds.has(String(blog.author?._id))}
                onToggleFollow={toggleFollow}
              />
            ))
          )}
        </main>

        <FollowingSidebar following={following} onUnfollow={(id) => toggleFollow(id, true)} />
      </div>
    </>
  );
}
