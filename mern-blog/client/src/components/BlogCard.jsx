export default function BlogCard({ blog, isSelf, isFollowing, onToggleFollow }) {
  return (
    <article className="card">
      <p className="blog-author">{blog.author?.name}</p>
      <h3 className="blog-title">{blog.title}</h3>
      <p className="blog-content">{blog.content}</p>
      <div className="row">
        <span className="blog-date">
          {new Date(blog.createdAt).toLocaleDateString()}
        </span>
        {!isSelf && (
          <button
            className={isFollowing ? "secondary" : ""}
            onClick={() => onToggleFollow(blog.author._id, isFollowing)}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        )}
      </div>
    </article>
  );
}
