import React, { useState, useEffect } from "react";

const CreatePost = ({ addPost, author, editData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setDescription(editData.description);
      setContent(editData.content);
      setImage(editData.image || null);
    }
  }, [editData]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost({ title, description, content, image, author });
    setTitle(""); setDescription(""); setContent(""); setImage(null);
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <h2>{editData ? "Edit Post" : "Create Post"}</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Short description" required />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" required />
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="preview" className="preview-image" />}
      <button type="submit">{editData ? "Save Changes" : "Add Post"}</button>
    </form>
  );
};

export default CreatePost;
