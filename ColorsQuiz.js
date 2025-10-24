import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NumbersQuiz.css"; 

export default function ColorsQuiz() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // ✅ Added: Get child name from local storage (saved during login)
  const childName = localStorage.getItem("childName") || "Unknown User";

  const colorQuizData = [
    { color: "Red", urls: ["https://th.bing.com/th/id/R.c2181265870ed35f75ccd360dbbc96fe?rik=0%2bbKQH0rUgY7ng&riu=http%3a%2f%2fentertainmentmesh.com%2fwp-content%2fuploads%2f2016%2f01%2fdeep-red-rose.jpg&ehk=YLV5wUtEhLDmYLh0HTadrFeycZzVG4vovl7lmjbakz0%3d&risl=&pid=ImgRaw&r=0"] },
    { color: "Blue", urls: ["https://www.cleankisslifestyle.com/cdn/shop/articles/316942-blue-sky-with-clouds.jpg?v=1605136872&width=1920"] },
    { color: "Green", urls: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqupFydY0uAjM2pO7EE5BMJAiBObk9WNVWPw&s"] },
    { color: "Yellow", urls: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCem2v8vv-QzTYCjFHRMtSjz_6hq3Cx5dJSQ&s"] },
    { color: "Orange", urls: ["https://cdn.britannica.com/24/174524-050-A851D3F2/Oranges.jpg"] },
    { color: "Pink", urls: ["https://images.unsplash.com/photo-1501686962565-1350ab98237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGluayUyMGZsb3dlcnxlbnwwfHwwfHx8MA%3D%3D"] },
    { color: "Purple", urls: ["https://plus.unsplash.com/premium_photo-1720525676483-eef667c388d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHB1cnBsZSUyMHRveXxlbnwwfHwwfHx8MA%3D%3D"] },
    { color: "Brown", urls: ["https://5.imimg.com/data5/CW/EM/MY-65385261/clay-pot-500x500.jpg"] },
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

  // ✅ Function to save quiz score in MongoDB
  const saveScore = async (childName, quizType, score, total) => {
    try {
      const response = await fetch("http://localhost:5000/saveScore", { // <-- backend port
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childName,
          quizType,
          score,
          total,
          date: new Date(),
        }),
      });
      const result = await response.json();
      console.log("✅ Quiz score saved:", result.message);
    } catch (error) {
      console.error("❌ Error saving quiz score:", error);
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

      // ✅ Save score when quiz finishes
      saveScore(childName, "Colors Quiz", score, colorQuizData.length);
    }
  };

  const handlePrevious = () => {
    if (index > 0) {
      const prevIndex = index - 1;
      setIndex(prevIndex);
      setSelected("");
      setFeedback("");
      setOptions(generateOptions(colorQuizData[prevIndex].color));
    }
  };

  const handleRetry = () => {
    setSelected("");
    setFeedback("");
  };

  return (
    <div className="numbers-quiz">
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
                      src={optData.urls[0]}
                      alt={opt}
                      style={{ width: "80px", height: "80px", borderRadius: "10px" }}
                    />
                  </button>
                );
              })}
            </div>

            <div className="quiz-buttons">
              <button onClick={handlePrevious} disabled={index === 0}>Previous</button>
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
