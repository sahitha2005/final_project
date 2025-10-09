import React from "react";
import { useNavigate } from "react-router-dom";
import "./ShapesPage.css";

// Shapes thumbnails (can use first image for preview)
const shapesData = {
  Circle: "https://cdn1.iconfinder.com/data/icons/material-core/20/check-circle-outline-blank-256.png",
  Square: "https://cdn0.iconfinder.com/data/icons/phosphor-regular-vol-4/256/square-256.png",
  Triangle: "https://cdn3.iconfinder.com/data/icons/feather-5/24/triangle-256.png",
  Rectangle: "https://cdn0.iconfinder.com/data/icons/entypo/100/big36-256.png",
  Star: "https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-19-256.png",
  Rhombus: "https://cdn3.iconfinder.com/data/icons/pixel-perfect-outlines/100/rombus-256.png",
  Pentagon: "https://cdn1.iconfinder.com/data/icons/iconoir-vol-3/24/pentagon-256.png",
  Oval: "https://cdn1.iconfinder.com/data/icons/shapes-102/24/_oval-256.png",
  SemiCircle: "https://cdn1.iconfinder.com/data/icons/shape-4/24/semicircle-256.png",
  Hexagon: "https://cdn1.iconfinder.com/data/icons/bootstrap-vol-3/16/hexagon-256.png"
};

const ShapesPage = () => {
  const navigate = useNavigate();

  const handleShapeClick = (shape) => {
    navigate(`/shapes/${shape}`);
  };

  return (
    <div className="shapes-grid-page">
      <button className="back-btn" onClick={() => navigate("/topics")}>
        Back to Topics
      </button>

      <h2>Select a Shape</h2>
      <div className="shapes-grid">
        {Object.keys(shapesData).map((shape) => (
          <div
            key={shape}
            className="shape-card"
            onClick={() => handleShapeClick(shape)}
          >
            <img src={shapesData[shape]} alt={shape} />
            <p className="shape-name">{shape}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShapesPage;
