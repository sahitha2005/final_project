import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NumbersQuiz.css";

const quizData = [
  { number: 1, word: "one" },
  { number: 2, word: "two" },
  { number: 3, word: "three" },
  { number: 4, word: "four" },
  { number: 5, word: "five" },
  { number: 6, word: "six" },
  { number: 7, word: "seven" },
  { number: 8, word: "eight" },
  { number: 9, word: "nine" },
  { number: 10, word: "ten" },
  { number: 11, word: "eleven" },
  { number: 12, word: "twelve" },
  { number: 13, word: "thirteen" },
  { number: 14, word: "fourteen" },
  { number: 15, word: "fifteen" },
  { number: 16, word: "sixteen" },
  { number: 17, word: "seventeen" },
  { number: 18, word: "eighteen" },
  { number: 19, word: "nineteen" },
  { number: 20, word: "twenty" }
];

export default function NumbersQuiz() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const childName = localStorage.getItem("childName") || "Unknown User";

  const current = quizData[index];

  // Generate options once per question
  const generateOptions = (correctWord) => {
    const others = quizData
      .filter((q) => q.word !== correctWord)
      .map((q) => q.word);
    const randomOptions = [correctWord, ...others.sort(() => 0.5 - Math.random()).slice(0, 3)];
    return randomOptions.sort(() => 0.5 - Math.random());
  };

  const [options, setOptions] = useState(generateOptions(current.word));

  // Voice feedback
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleSelect = (choice) => {
    if (selected) return; // prevent re-clicking

    setSelected(choice);

    if (choice === current.word) {
      setFeedback("correct");
      setScore(score + 1);
      const messages = ["Correct!", "Good job!"];
      speak(messages[Math.floor(Math.random() * messages.length)]);
    } else {
      setFeedback("wrong");
      speak("Try again!");
    }
  };

  const saveScore = async (childName, score, total) => {
    try {
      const response = await fetch("http://localhost:5000/saveScore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childName,
          quizType: "Numbers Quiz",
          score,
          total,
          date: new Date(),
        }),
      });
      const result = await response.json();
      console.log("✅ Number quiz score saved:", result.message);
    } catch (error) {
      console.error("❌ Error saving number quiz score:", error);
    }
  };

  const handleNext = () => {
    if (index < quizData.length - 1) {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      setSelected("");
      setFeedback("");
      setOptions(generateOptions(quizData[nextIndex].word));
    } else {
      setQuizCompleted(true); // show final score in card
      speak(`Quiz completed! Your score is ${score} out of ${quizData.length}`);
      saveScore(childName, score, quizData.length); // ✅ Save score in database
    }
  };

  const handleRetry = () => {
    setSelected("");
    setFeedback("");
  };

  return (
    <div className="numbers-quiz">
      {/* Centered Back Button at Top */}
      <div className="top-center">
        <button className="back-btn" onClick={() => navigate("/numbers")}>
          Back to Numbers
        </button>
      </div>

      <div className="quiz-card">
        {quizCompleted ? (
          // Final Score View
          <div className="final-score-card">
            <h2>🎉 Quiz Completed! 🎉</h2>
            <div className="score-card">
              Your Score: {score} / {quizData.length}
            </div>
          </div>
        ) : (
          <>
            <h2>Number: {current.number}</h2>

            <div className="options">
              {options.map((opt, i) => (
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
                  {opt}
                </button>
              ))}
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
