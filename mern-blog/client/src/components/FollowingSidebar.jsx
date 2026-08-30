export default function FollowingSidebar({ following, onUnfollow }) {
  return (
    <aside className="card">
      <h2>Following</h2>
      {following.length === 0 ? (
        <p className="muted" style={{ margin: 0 }}>
          You are not following anyone yet.
        </p>
      ) : (
        following.map((u) => (
          <div className="row" key={u._id}>
            <span>{u.name}</span>
            <button className="secondary" onClick={() => onUnfollow(u._id)}>
              Unfollow
            </button>
          </div>
        ))
      )}
    </aside>
  );
}
