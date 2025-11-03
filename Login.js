import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function Login() {
  const navigate = useNavigate();
  const [parentEmail, setParentEmail] = useState("");
  const [childName, setChildName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!parentEmail || !childName || !password) {
      setError("Please fill all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parentEmail, childName, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("childName", data.childName);
        navigate("/topics");
      } else {
        setError(data.message || "Invalid credentials.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}

        <input type="email" placeholder="Parent Email" value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} className="input-field"/>
        <input type="text" placeholder="Child Name" value={childName} onChange={(e) => setChildName(e.target.value)} className="input-field"/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field"/>

        <button type="submit" className="submit-btn">Login</button>

        <p style={{ marginTop: "10px", fontSize: "14px" }}>
          Don't have an account? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </form>
    </div>
  );
}

export default Login;
