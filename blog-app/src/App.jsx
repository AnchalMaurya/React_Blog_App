import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import BlogList from "./components/BlogList";
import CreatePost from "./components/CreatePost";
import Signup from "./components/Signup";
import Login from "./components/Login";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState("home"); // home | create | signup | login
  const [editPostData, setEditPostData] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setPosts(JSON.parse(localStorage.getItem("blogPosts")) || []);
    setLoggedInUser(JSON.parse(localStorage.getItem("loggedInUser")) || null);
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  useEffect(() => {
    localStorage.setItem("blogPosts", JSON.stringify(posts));
  }, [posts]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  const addPost = (postData) => {
    if (editPostData) {
      setPosts(posts.map(p => p.id === editPostData.id ? { ...editPostData, ...postData } : p));
      setEditPostData(null);
    } else {
      const newPost = { ...postData, id: generateId(), likes: [], comments: [] };
      setPosts([newPost, ...posts]);
    }
    setView("home");
  };

  const deletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter(p => p.id !== postId));
    }
  };

  const editPost = (post) => {
    setEditPostData(post);
    setView("create");
  };

  const toggleLike = (postId) => {
    if (!loggedInUser) { alert("Please login to like"); return; }
    setPosts(posts.map(p => {
      if (p.id !== postId) return p;
      const liked = p.likes.includes(loggedInUser.username);
      return { ...p, likes: liked ? p.likes.filter(u => u !== loggedInUser.username) : [...p.likes, loggedInUser.username] };
    }));
  };

  const addComment = (postId, text) => {
    if (!loggedInUser) { alert("Please login to comment"); return; }
    setPosts(posts.map(p => p.id === postId ? { ...p, comments: [...p.comments, { id: generateId(), user: loggedInUser.username, text, date: new Date().toLocaleString() }] } : p));
  };

  const handleLogin = (user) => {
    setLoggedInUser(user);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setView("home");
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
    setView("home");
  };

  return (
    <div>
      <Navbar
        user={loggedInUser}
        onLogout={handleLogout}
        setView={setView}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <div className="container">
        {view === "home" && (
          <BlogList
            posts={posts}
            loggedInUser={loggedInUser}
            onDelete={deletePost}
            onEdit={editPost}
            onToggleLike={toggleLike}
            onAddComment={addComment}
          />
        )}
        {view === "create" && <CreatePost addPost={addPost} author={loggedInUser?.username || "Anonymous"} editData={editPostData} />}
        {view === "signup" && <Signup onSignup={() => setView("login")} />}
        {view === "login" && <Login onLogin={handleLogin} />}
      </div>
    </div>
  );
};

export default App;
