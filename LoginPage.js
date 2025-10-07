import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // optional: for styling

const LoginPage = () => {
  const navigate = useNavigate();
  const [childName, setChildName] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!childName || !parentName || !parentEmail) {
      alert("Please fill all fields!");
      return;
    }

    // Save user info to localStorage
    const userInfo = { childName, parentName, parentEmail };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    // Navigate to TopicsPage
    navigate("/topics");
  };

  return (
    <div className="login-container">
      <h2>Welcome! Please enter details</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Child Name:
          <input
            type="text"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
          />
        </label>
        <label>
          Parent Name:
          <input
            type="text"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
          />
        </label>
        <label>
          Parent Email:
          <input
            type="email"
            value={parentEmail}
            onChange={(e) => setParentEmail(e.target.value)}
          />
        </label>
        <button type="submit">Start Learning</button>
      </form>
    </div>
  );
};

export default LoginPage;
