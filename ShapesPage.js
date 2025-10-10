import React from "react";
import { useNavigate } from "react-router-dom";
import "./ShapesPage.css";

const shapesData = [
  { name: "Circle", url: "https://cdn1.iconfinder.com/data/icons/material-core/20/check-circle-outline-blank-256.png" },
  { name: "Square", url: "https://cdn0.iconfinder.com/data/icons/phosphor-regular-vol-4/256/square-256.png" },
  { name: "Triangle", url: "https://cdn3.iconfinder.com/data/icons/feather-5/24/triangle-256.png" },
  { name: "Rectangle", url: "https://cdn0.iconfinder.com/data/icons/entypo/100/big36-256.png" },
  { name: "Star", url: "https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-19-256.png" },
  { name: "Rhombus", url: "https://cdn3.iconfinder.com/data/icons/pixel-perfect-outlines/100/rombus-256.png" },
  { name: "Pentagon", url: "https://cdn1.iconfinder.com/data/icons/iconoir-vol-3/24/pentagon-256.png" },
  { name: "Oval", url: "https://cdn1.iconfinder.com/data/icons/shapes-102/24/_oval-256.png" },
  { name: "SemiCircle", url: "https://cdn1.iconfinder.com/data/icons/shape-4/24/semicircle-256.png" },
  { name: "Hexagon", url: "https://cdn1.iconfinder.com/data/icons/bootstrap-vol-3/16/hexagon-256.png" },
];

export default function ShapesPage() {
  const navigate = useNavigate();

  return (
    <div className="shapes-page-container">
      {/* Top Center Back Button */}
      <div className="button-top-center">
        <button className="back-btn" onClick={() => navigate("/topics")}>
          Back to Topics
        </button>
      </div>

      {/* Centered Heading */}
      <h2 className="centered-title">Select a Shape</h2>

      {/* Shapes Grid */}
      <div className="shapes-grid">
        {shapesData.map((shape) => (
          <div
            key={shape.name}
            className="shape-card"
            onClick={() => navigate(`/shapes/${shape.name}`)}
          >
            <img src={shape.url} alt={shape.name} />
            <p className="shape-name">{shape.name}</p>
          </div>
        ))}
      </div>

      {/* Bottom Center Start Quiz Button */}
      <div className="button-bottom-center">
        <button
          className="start-quiz-btn"
          onClick={() => navigate("/activities/shapes-quiz")}
        >
          Start Shapes Quiz
        </button>
      </div>
    </div>
  );
}
