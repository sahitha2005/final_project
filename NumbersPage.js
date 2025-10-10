import React from "react";
import { useNavigate } from "react-router-dom";
import "./NumbersPage.css";

const NumbersPage = () => {
  const navigate = useNavigate();
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div className="numbers-page">
      <button className="back-btn" onClick={() => navigate("/topics")}>
        Back to Topics
      </button>

      <div className="numbers-grid">
        {numbers.map((num) => (
          <button
            key={num}
            className="number-button"
            onClick={() => navigate(`/numbers/${num}`)}
          >
            {num}
          </button>
        ))}
      </div>
      <button className="next-btn" onClick={() => navigate("/activities/numbers-quiz")}>
  Start Numbers Quiz
</button>
    </div>
  );
};

export default NumbersPage;
