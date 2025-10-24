// src/components/Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function Login() {
  const navigate = useNavigate();
  const [childName, setChildName] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!childName || !parentName || !parentEmail) {
      setError("Please fill all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/addUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ childName, parentName, parentEmail }),
      });

      const data = await response.json();

      if (response.ok || data.success) {
        // ✅ Store childName in localStorage
        localStorage.setItem("childName", childName);

        navigate("/topics"); // redirect to topics page
      } else {
        setError(data.message || "Error adding user.");
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
        <input
          type="text"
          placeholder="Child Name"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Parent Name"
          value={parentName}
          onChange={(e) => setParentName(e.target.value)}
          className="input-field"
        />
        <input
          type="email"
          placeholder="Parent Email"
          value={parentEmail}
          onChange={(e) => setParentEmail(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
