import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function Signup() {
  const navigate = useNavigate();
  const [childName, setChildName] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!childName || !parentName || !parentEmail || !password) {
      setError("Please fill all fields.");
      setSuccess("");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ childName, parentName, parentEmail, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess("Signup successful! Redirecting to login...");
        setError("");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(data.message || "Signup failed.");
        setSuccess("");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <input type="text" placeholder="Child Name" value={childName} onChange={(e) => setChildName(e.target.value)} className="input-field"/>
        <input type="text" placeholder="Parent Name" value={parentName} onChange={(e) => setParentName(e.target.value)} className="input-field"/>
        <input type="email" placeholder="Parent Email" value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} className="input-field"/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field"/>

        <button type="submit" className="submit-btn">Sign Up</button>

        <p style={{ marginTop: "10px", fontSize: "14px" }}>
          Already have an account? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
