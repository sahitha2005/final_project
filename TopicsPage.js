import React from "react";
import { useNavigate } from "react-router-dom";
import "./TopicsPage.css";

const TopicsPage = () => {
  const navigate = useNavigate();

  const topics = [
    { name: "Alphabets", path: "/alphabets", image: "/images/alphabets.jpg" },
    { name: "Numbers", path: "/numbers", image: "/images/numbers.jpg" },
    { name: "Colors", path: "/colors", image: "/images/colors.jpg" },
    { name: "Shapes", path: "/shapes", image: "/images/shapes.jpg" },
  ];

  return (
    <div className="topic-page">
      <h2>Choose a Topic</h2>
      <div className="topics-grid">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="topic-card"
            onClick={() => navigate(topic.path)}
          >
            <img
              src={topic.image}
              alt={topic.name}
              className="topic-image"
            />
            <p>{topic.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicsPage;
