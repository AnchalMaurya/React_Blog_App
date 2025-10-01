import React, { useState } from "react";

const BlogList = ({ posts, onDelete, onEdit, onToggleLike, onAddComment, loggedInUser }) => {
  const [search, setSearch] = useState("");
  const [commentText, setCommentText] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const filtered = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  // Pagination
  const totalPages = Math.ceil(filtered.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filtered.slice(indexOfFirstPost, indexOfLastPost);

  const handleCommentChange = (postId, text) => setCommentText({ ...commentText, [postId]: text });
  const handleAddComment = (postId) => {
    if (!commentText[postId]?.trim()) return;
    onAddComment(postId, commentText[postId].trim());
    setCommentText({ ...commentText, [postId]: "" });
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div>
      <input
        className="search-bar"
        placeholder="Search..."
        value={search}
        onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
      />
      <div className="grid">
        {currentPosts.map(post => (
          <div key={post.id} className="blog-card">
            <div className="card-image-wrapper">
              {post.image ? (
                <img src={post.image} alt={post.title} className="card-image" />
              ) : (
                <div className="card-no-image">No Image</div>
              )}
            </div>
            <div className="card-content">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <small>By {post.author} | {post.date}</small>
              <div className="card-actions">
                <button style={{backgroundColor:"#F75270"}}onClick={() => onToggleLike(post.id)}>
                  {post.likes.includes(loggedInUser?.username) ? "❤️" : "🤍"} {post.likes.length}
                </button>
                <button onClick={() => onEdit(post)}>Edit</button>
                <button onClick={() => onDelete(post.id)}>Delete</button>
              </div>

              {/* Comments */}
              <div className="comments-section">
                <h4>Comments ({post.comments.length})</h4>
                {post.comments.map(c => (
                  <div key={c.id} className="comment">
                    <strong>{c.user}</strong>: {c.text} <span className="comment-date">{c.date}</span>
                  </div>
                ))}
                {loggedInUser && (
                  <div className="add-comment">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={commentText[post.id] || ""}
                      onChange={e => handleCommentChange(post.id, e.target.value)}
                    />
                    <button onClick={() => handleAddComment(post.id)}>Comment</button>
                  </div>
                )}
                {!loggedInUser && <small>Login to comment</small>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}
    </div>
  );
};

export default BlogList;
