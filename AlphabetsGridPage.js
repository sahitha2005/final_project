import React from "react";
import { useNavigate } from "react-router-dom";
import "./AlphabetsGridPage.css";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const AlphabetsGridPage = () => {
  const navigate = useNavigate();

  const handleLetterClick = (letter) => {
    navigate(`/alphabets/${letter}`);
  };

  return (
    <div className="alphabet-grid-page">
      <button className="back-btn" onClick={() => navigate("/topics")}>
        Back to Topics
      </button>

      <h2>Select a Letter</h2>

      <div className="letters-grid">
        {letters.map((letter) => (
          <div
            key={letter}
            className="letter-card"
            onClick={() => handleLetterClick(letter)}
          >
            {letter}
          </div>
        ))}
      </div>

      {/* ✅ Bottom Center Start Quiz Button */}
      <div className="button-bottom-center">
        <button
          className="start-quiz-btn"
          onClick={() => navigate("/activities")}
        >
          Start Alphabet Quiz
        </button>
      </div>
    </div>
  );
};

export default AlphabetsGridPage;
