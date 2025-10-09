import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SingleNumberPage.css";

// Number words map
const numberWords = {
  1: "one", 2: "two", 3: "three", 4: "four", 5: "five",
  6: "six", 7: "seven", 8: "eight", 9: "nine", 10: "ten",
  11: "eleven", 12: "twelve", 13: "thirteen", 14: "fourteen", 15: "fifteen",
  16: "sixteen", 17: "seventeen", 18: "eighteen", 19: "nineteen", 20: "twenty",
  21: "twenty-one", 22: "twenty-two", 23: "twenty-three", 24: "twenty-four",
  25: "twenty-five", 26: "twenty-six", 27: "twenty-seven", 28: "twenty-eight",
  29: "twenty-nine", 30: "thirty", 31: "thirty-one", 32: "thirty-two",
  33: "thirty-three", 34: "thirty-four", 35: "thirty-five", 36: "thirty-six",
  37: "thirty-seven", 38: "thirty-eight", 39: "thirty-nine", 40: "forty",
  41: "forty-one", 42: "forty-two", 43: "forty-three", 44: "forty-four",
  45: "forty-five", 46: "forty-six", 47: "forty-seven", 48: "forty-eight",
  49: "forty-nine", 50: "fifty", 51: "fifty-one", 52: "fifty-two",
  53: "fifty-three", 54: "fifty-four", 55: "fifty-five", 56: "fifty-six",
  57: "fifty-seven", 58: "fifty-eight", 59: "fifty-nine", 60: "sixty",
  61: "sixty-one", 62: "sixty-two", 63: "sixty-three", 64: "sixty-four",
  65: "sixty-five", 66: "sixty-six", 67: "sixty-seven", 68: "sixty-eight",
  69: "sixty-nine", 70: "seventy", 71: "seventy-one", 72: "seventy-two",
  73: "seventy-three", 74: "seventy-four", 75: "seventy-five",
  76: "seventy-six", 77: "seventy-seven", 78: "seventy-eight",
  79: "seventy-nine", 80: "eighty", 81: "eighty-one", 82: "eighty-two",
  83: "eighty-three", 84: "eighty-four", 85: "eighty-five",
  86: "eighty-six", 87: "eighty-seven", 88: "eighty-eight",
  89: "eighty-nine", 90: "ninety", 91: "ninety-one", 92: "ninety-two",
  93: "ninety-three", 94: "ninety-four", 95: "ninety-five",
  96: "ninety-six", 97: "ninety-seven", 98: "ninety-eight",
  99: "ninety-nine", 100: "one hundred"
};

// Generate placeholder image for numbers
const getNumberImageUrl = (num) =>
  `https://via.placeholder.com/200?text=${num}`;

const SingleNumberPage = () => {
  const { number } = useParams();
  const navigate = useNavigate();
  const [currentNumber, setCurrentNumber] = useState(parseInt(number));

  useEffect(() => {
    speakNumber(currentNumber);
  }, [currentNumber]);

  // Speak full number word
  const speakNumber = (n) => {
    const utterance = new SpeechSynthesisUtterance(numberWords[n]);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      (v) => v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("zira")
    );
    if (femaleVoice) utterance.voice = femaleVoice;
    window.speechSynthesis.speak(utterance);
  };

  // Speak letters of the number word
  const speakLetters = (n) => {
    const spelled = numberWords[n].split("").join("-");
    const utterance = new SpeechSynthesisUtterance(spelled);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      (v) => v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("zira")
    );
    if (femaleVoice) utterance.voice = femaleVoice;
    window.speechSynthesis.speak(utterance);
  };

  const handleNext = () => {
    if (currentNumber < 100) setCurrentNumber(currentNumber + 1);
  };

  const handlePrevious = () => {
    if (currentNumber > 1) setCurrentNumber(currentNumber - 1);
  };

  return (
    <div className="single-number-page">
      <button className="back-btn" onClick={() => navigate("/numbers")}>
        Back to Numbers
      </button>

      <div className="number-content">
        <h2>{currentNumber}</h2>
        <div className="image-container">
          <img
            src={getNumberImageUrl(currentNumber)}
            alt={currentNumber}
            onClick={() => speakLetters(currentNumber)}
          />
          <p className="number-word">{numberWords[currentNumber]}</p>
        </div>
      </div>

      <div className="navigation-buttons">
        <button onClick={handlePrevious} disabled={currentNumber === 1}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentNumber === 100}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SingleNumberPage;