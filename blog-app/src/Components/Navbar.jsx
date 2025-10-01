import React from "react";

const Navbar = ({ user, onLogout, setView, theme, toggleTheme }) => {
  return (
    <nav className="navbar">
      <h1 className="logo" onClick={() => setView("home")}>BlogSphere</h1>
      <div className="nav-actions">
        <button onClick={() => setView("home")}>Home</button>
        <button onClick={() => setView("create")}>Add Blog</button>
        <button onClick={toggleTheme}>{theme === "light" ? "🌙 Dark" : "☀️ Light"}</button>
        {!user && <button onClick={() => setView("signup")}>Signup</button>}
        {!user && <button onClick={() => setView("login")}>Login</button>}
        {user && (
          <>
            <div className="user-info">
              <p><strong>👋, {user.username}</strong></p>
            </div>
            <button onClick={onLogout}>Logout</button>
          </>
        )}
        
      </div>
    </nav>
  );
};

export default Navbar;
