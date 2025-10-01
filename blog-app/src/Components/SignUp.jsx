import React, { useState } from "react";

const Signup = ({ onSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [msg, setMsg] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.username === username)) { setMsg("Username exists"); return; }
    users.push({ username, password, mobile, email, gender });
    localStorage.setItem("users", JSON.stringify(users));
    setMsg("Signup successful");
    if (onSignup) onSignup();
  };

  return (
    <form className="create-form" onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <input type="tel" pattern="[0-9]{10}" value={mobile} onChange={e => setMobile(e.target.value)} placeholder="Mobile" required />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <select value={gender} onChange={e => setGender(e.target.value)}>
        <option>Male</option><option>Female</option><option>Other</option>
      </select>
      <button type="submit">Signup</button>
      {msg && <p>{msg}</p>}
    </form>
  );
};

export default Signup;
