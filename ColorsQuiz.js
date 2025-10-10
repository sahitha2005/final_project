import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NumbersQuiz.css"; // same CSS as number quiz

export default function ColorsQuiz() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const colorQuizData = [
    { color: "Red", url: "https://via.placeholder.com/100/FF0000/FFFFFF?text=Red" },
    { color: "Blue", url: "https://via.placeholder.com/100/0000FF/FFFFFF?text=Blue" },
    { color: "Green", url: "https://via.placeholder.com/100/008000/FFFFFF?text=Green" },
    { color: "Yellow", url: "https://via.placeholder.com/100/FFFF00/000000?text=Yellow" },
    { color: "Orange", url: "https://via.placeholder.com/100/FFA500/FFFFFF?text=Orange" },
    { color: "Pink", url: "https://via.placeholder.com/100/FFC0CB/000000?text=Pink" },
    { color: "Purple", url: "https://via.placeholder.com/100/800080/FFFFFF?text=Purple" },
    { color: "Brown", url: "https://via.placeholder.com/100/A52A2A/FFFFFF?text=Brown" }
  ];

  const current = colorQuizData[index];

  const generateOptions = (correctColor) => {
    const others = colorQuizData
      .filter((q) => q.color !== correctColor)
      .map((q) => q.color);
    const randomOptions = [correctColor, ...others.sort(() => 0.5 - Math.random()).slice(0, 3)];
    return randomOptions.sort(() => 0.5 - Math.random());
  };

  const [options, setOptions] = useState(generateOptions(current.color));

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleSelect = (choice) => {
    if (selected) return;

    setSelected(choice);

    if (choice === current.color) {
      setFeedback("correct");
      setScore(score + 1);
      const messages = ["Correct!", "Good job!"];
      speak(messages[Math.floor(Math.random() * messages.length)]);
    } else {
      setFeedback("wrong");
      speak("Try again!");
    }
  };

  const handleNext = () => {
    if (index < colorQuizData.length - 1) {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      setSelected("");
      setFeedback("");
      setOptions(generateOptions(colorQuizData[nextIndex].color));
    } else {
      setQuizCompleted(true);
      speak(`Quiz completed! Your score is ${score} out of ${colorQuizData.length}`);
    }
  };

  const handleRetry = () => {
    setSelected("");
    setFeedback("");
  };

  return (
    <div className="numbers-quiz">
      {/* Centered Back Button */}
      <div className="top-center">
        <button className="back-btn" onClick={() => navigate("/colors")}>
          Back to Colors
        </button>
      </div>

      <div className="quiz-card">
        {quizCompleted ? (
          <div className="final-score-card">
            <h2>🎉 Quiz Completed! 🎉</h2>
            <div className="score-card">
              Your Score: {score} / {colorQuizData.length}
            </div>
          </div>
        ) : (
          <>
            <h2>Color: {current.color}</h2>
            <div className="options">
              {options.map((opt, i) => {
                const optData = colorQuizData.find((c) => c.color === opt);
                return (
                  <button
                    key={i}
                    className={`option-btn ${
                      selected === opt && feedback === "correct"
                        ? "correct"
                        : selected === opt && feedback === "wrong"
                        ? "wrong"
                        : ""
                    }`}
                    onClick={() => handleSelect(opt)}
                  >
                    <img
                      src={optData.url}
                      alt={opt}
                      style={{ width: "80px", height: "80px", borderRadius: "10px" }}
                    />
                  </button>
                );
              })}
            </div>

            <div className="quiz-buttons">
              {feedback === "wrong" && <button onClick={handleRetry}>Retry</button>}
              <button onClick={handleNext}>Next</button>
            </div>

            <div className="score-card">Score: {score}</div>
          </>
        )}
      </div>
    </div>
  );
}
