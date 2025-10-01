import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [identifier, setIdentifier] = useState(""); // username or email
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => (u.username === identifier || u.email === identifier) && u.password === password);
    if (!user) { setMsg("Invalid Username or Password"); return; }
    onLogin(user);
  };

  return (
    <form className="create-form" onSubmit={handleLogin}>
      <h2>Login</h2>
      <input value={identifier} onChange={e => setIdentifier(e.target.value)} placeholder="Username or Email" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
      {msg && <p>{msg}</p>}
    </form>
  );
};

export default Login;
