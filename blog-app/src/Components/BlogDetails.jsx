import React, { useState } from "react";

const BlogDetails = ({
  post,
  onDelete,
  onEdit,
  onToggleLike,
  onAddComment,
  loggedInUser,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editDescription, setEditDescription] = useState(post.description);
  const [editContent, setEditContent] = useState(post.content);
  const [editImage, setEditImage] = useState(post.image || null);
  const [commentText, setCommentText] = useState("");

  // image upload handler for edit
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setEditImage(reader.result);
    reader.readAsDataURL(file);
  };

  const saveEdit = () => {
    const updated = {
      ...post,
      title: editTitle,
      description: editDescription,
      content: editContent,
      image: editImage
    };
    onEdit(updated);
    setIsEditing(false);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText.trim());
    setCommentText("");
  };

  return (
    <div className="blog-details">
      {isEditing ? (
        <div>
          <h2>Edit Post</h2>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Short description"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Content"
          />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {editImage && (
            <img src={editImage} alt="preview" style={{ width: "100%", marginTop: 8, borderRadius: 6 }} />
          )}
          <div style={{ marginTop: 8 }}>
            <button onClick={saveEdit}>Save</button>
            <button onClick={() => setIsEditing(false)} style={{ marginLeft: 8 }}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2>{post.title}</h2>
          <p className="meta">By {post.author} on {post.date}</p>
          <hr />
          {post.image && <img src={post.image} alt={post.title} className="detail-image" />}
          <p style={{ whiteSpace: "pre-wrap" }}>{post.content}</p>

          <div className="detail-actions">
            <button onClick={() => onToggleLike(post.id)}>
              {post.likes?.includes(loggedInUser?.username) ? "💙 Unlike" : "🤍 Like"} ({post.likes?.length || 0})
            </button>

            {loggedInUser && loggedInUser.username === post.author && (
              <>
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={() => onDelete(post.id)} style={{ marginLeft: 8 }}>Delete</button>
              </>
            )}
          </div>

          <hr />
          <div className="comments-section">
            <h3>Comments ({post.comments?.length || 0})</h3>

            {post.comments && post.comments.length > 0 ? (
              post.comments.map((c) => (
                <div key={c.id} className="comment">
                  <strong>{c.user}</strong> <span className="comment-date">{c.date}</span>
                  <p>{c.text}</p>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}

            <form onSubmit={handleAddComment} className="comment-form">
              <textarea
                placeholder={loggedInUser ? "Write a comment..." : "Please login to comment"}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={!loggedInUser}
              />
              <button type="submit" disabled={!loggedInUser}>Add Comment</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
