import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NumbersQuiz.css"; // reuse the same CSS

export default function ShapesQuiz() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const shapeQuizData = [
    { name: "Circle", url: "https://cdn1.iconfinder.com/data/icons/material-core/20/check-circle-outline-blank-256.png" },
    { name: "Square", url: "https://cdn0.iconfinder.com/data/icons/phosphor-regular-vol-4/256/square-256.png" },
    { name: "Triangle", url: "https://cdn3.iconfinder.com/data/icons/feather-5/24/triangle-256.png" },
    { name: "Rectangle", url: "https://cdn0.iconfinder.com/data/icons/entypo/100/big36-256.png" },
    { name: "Star", url: "https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-19-256.png" },
    { name: "Rhombus", url: "https://cdn3.iconfinder.com/data/icons/pixel-perfect-outlines/100/rombus-256.png" },
    { name: "Pentagon", url: "https://cdn1.iconfinder.com/data/icons/iconoir-vol-3/24/pentagon-256.png" },
    { name: "Oval", url: "https://cdn1.iconfinder.com/data/icons/shapes-102/24/_oval-256.png" },
  ];

  const current = shapeQuizData[index];

  const generateOptions = (correctShape) => {
    const others = shapeQuizData
      .filter((q) => q.name !== correctShape)
      .map((q) => q.name);
    const randomOptions = [correctShape, ...others.sort(() => 0.5 - Math.random()).slice(0, 3)];
    return randomOptions.sort(() => 0.5 - Math.random());
  };

  const [options, setOptions] = useState(generateOptions(current.name));

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

    if (choice === current.name) {
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
    if (index < shapeQuizData.length - 1) {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      setSelected("");
      setFeedback("");
      setOptions(generateOptions(shapeQuizData[nextIndex].name));
    } else {
      setQuizCompleted(true);
      speak(`Quiz completed! Your score is ${score} out of ${shapeQuizData.length}`);
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
        <button className="back-btn" onClick={() => navigate("/shapes")}>
          Back to Shapes
        </button>
      </div>

      <div className="quiz-card">
        {quizCompleted ? (
          <div className="final-score-card">
            <h2>🎉 Quiz Completed! 🎉</h2>
            <div className="score-card">
              Your Score: {score} / {shapeQuizData.length}
            </div>
          </div>
        ) : (
          <>
            <h2>Shape: {current.name}</h2>
            <div className="options">
              {options.map((opt, i) => {
                const optData = shapeQuizData.find((s) => s.name === opt);
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
