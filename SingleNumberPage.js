import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SingleNumberPage.css";

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

// Placeholder image URLs for each number (replace with your URLs)
const numberImages = {
  1: "https://png.pngtree.com/png-vector/20240808/ourlarge/pngtree-bright-yellow-number-1-on-a-clear-transparent-background-png-image_13411383.png",
  2: "https://img.freepik.com/premium-psd/golden-number-2-transparent-background-3d-rendering-illustration_173189-6608.jpg",
  3: "https://png.pngtree.com/png-clipart/20210310/ourmid/pngtree-3d-golden-number-3-isolated-on-transparent-background-png-image_3016506.jpg",
  4: "https://png.pngtree.com/png-vector/20210301/ourmid/pngtree-gold-number-4-on-stage-podium-png-image_2989897.jpg",
  5: "https://png.pngtree.com/png-vector/20210302/ourmid/pngtree-number-5-or-five-gold-luxury-png-image_3000520.jpg",
  6: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR76rtNujQEVqfGUkx6O3kbbqPjw5DNPmLCjw&s",
  7: "https://png.pngtree.com/png-vector/20240528/ourlarge/pngtree-gold-number-7-on-transparent-background-png-image_12512234.png",
  8: "https://png.pngtree.com/png-vector/20250521/ourlarge/pngtree-gold-number-8-png-image_16342810.png",
  9: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT24xOhkxt1zitPP0AQBsrVTV5jVv5D1O2kOg&s",
  10: "https://img.freepik.com/premium-psd/golden-number-10-transparent-background-3d-rendering-illustration_173189-6606.jpg",
  11: "https://png.pngtree.com/png-clipart/20240701/original/pngtree-golden-colour-number-11-png-image_15462096.png",
  12: "https://png.pngtree.com/png-clipart/20240718/original/pngtree-golden-color-number-12-illustration-png-image_15582025.png",
  13: "https://thumbs.dreamstime.com/b/bold-golden-number-metallic-finish-striking-three-dimensional-representation-thirteen-crafted-gold-metal-shines-394698874.jpg",
  14: "https://media.istockphoto.com/id/503216088/photo/3d-number-14-gold.jpg?s=170667a&w=0&k=20&c=FEWnsAdVTQd-Ml6Cx1xjmfBpBM4f9v2vwh-mRePfnZw=",
  15: "https://png.pngtree.com/png-clipart/20240701/original/pngtree-golden-colour-number-15-png-image_15462140.png",    
  16: "https://png.pngtree.com/png-vector/20240528/ourlarge/pngtree-golden-colour-number-16-png-image_12541009.png",
  17: "https://png.pngtree.com/png-vector/20240528/ourmid/pngtree-golden-colour-number-17-png-image_12541010.png",
  18: "https://png.pngtree.com/png-clipart/20240701/original/pngtree-golden-colour-number-18-png-image_15462143.png",
  19: "https://png.pngtree.com/png-vector/20240528/ourlarge/pngtree-golden-colour-number-19-png-image_12541012.png",
  20: "https://png.pngtree.com/png-vector/20240528/ourlarge/pngtree-golden-colour-number-20-png-image_12541013.png",
  21: "https://png.pngtree.com/png-clipart/20210211/ourmid/pngtree-number-21-golden-font-png-image_2897950.jpg",
  22: "https://png.pngtree.com/png-clipart/20210301/ourmid/pngtree-number-22-3d-rendering-png-image_2992768.jpg",
  23: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-23-3d-rendering-png-image_6052024.jpg",
  24: "https://thumbs.dreamstime.com/b/number-gold-d-white-background-marketing-sales-discounts-promotions-financial-business-anniversary-banner-years-golden-367425994.jpg",
  25: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Fu-5Gulsk0pvgJ0yF5FOFDllKbUBf07HqA&s",
  26: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0P6ih-87LAsA29bIQWFp3jIAuvE0BeRVT3g&s",
  27: "https://png.pngtree.com/png-vector/20240528/ourmid/pngtree-golden-colour-number-27-png-image_12541049.png",
  28: "https://png.pngtree.com/png-clipart/20210301/ourmid/pngtree-number-28-3d-rendering-png-image_2992775.jpg",
  29: "https://png.pngtree.com/png-clipart/20210211/ourmid/pngtree-number-29-golden-font-png-image_2897959.jpg",
  30: "https://png.pngtree.com/png-vector/20240528/ourlarge/pngtree-golden-colour-number-30-png-image_12541053.png",
  31: "https://png.pngtree.com/png-vector/20240528/ourlarge/pngtree-golden-colour-number-31-png-image_12541054.png",
  32: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-32-3d-rendering-png-image_6052033.jpg",
  33: "https://png.pngtree.com/png-vector/20240528/ourlarge/pngtree-golden-colour-number-33-png-image_12541056.png",
  34: "https://png.pngtree.com/png-vector/20240528/ourlarge/pngtree-golden-colour-number-34-png-image_12541057.png",
  35: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-35-golden-font-png-image_5985723.jpg",
  36: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-36-golden-font-png-image_5985724.jpg",
  37: "https://png.pngtree.com/png-vector/20240528/ourmid/pngtree-golden-colour-number-37-png-image_12541059.png",
  38: "https://png.pngtree.com/png-vector/20240528/ourmid/pngtree-golden-colour-number-38-png-image_12541062.png",
  39: "https://png.pngtree.com/png-vector/20240528/ourmid/pngtree-golden-colour-number-39-png-image_12541064.png",
  40: "https://png.pngtree.com/png-vector/20240528/ourmid/pngtree-golden-colour-number-40-png-image_12541067.png",
  41: "https://png.pngtree.com/png-clipart/20210301/ourmid/pngtree-number-41-3d-rendering-png-image_2992812.jpg",
  42: "https://png.pngtree.com/png-clipart/20210301/ourmid/pngtree-number-42-3d-rendering-png-image_2992793.jpg",
  43: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXzugAjLJhq0TW0qI3q8lSR8rxrUaIe2G2UQ&s",
  44: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-44-3d-rendering-png-image_6052061.jpg",
  45: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-45-number-3d-effect-design-png-png-image_5993990.jpg",
  46: "https://png.pngtree.com/png-clipart/20210301/ourmid/pngtree-number-46-3d-rendering-png-image_2992798.jpg",
  47: "https://png.pngtree.com/png-vector/20240607/ourmid/pngtree-golden-color-number-47-illustration-png-image_12643311.png",
  48: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-48-3d-rendering-png-image_6052065.jpg",
  49: "https://png.pngtree.com/png-vector/20240607/ourmid/pngtree-golden-color-number-49-illustration-png-image_12643317.png",
  50: "https://png.pngtree.com/png-clipart/20220327/ourmid/pngtree-number-50-golden-font-png-image_228135.png",
  51: "https://png.pngtree.com/png-vector/20240607/ourmid/pngtree-golden-color-number-51-illustration-png-image_12643323.png",
  52: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-52-3d-rendering-png-image_6052069.jpg",
  53: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-53-3d-rendering-png-image_6052070.jpg",
  54: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-54-golden-font-png-image_5999195.jpg",
  55: "https://img.freepik.com/premium-photo/number-55_2227-1226.jpg?w=360",
  56: "https://png.pngtree.com/png-clipart/20210218/ourmid/pngtree-number-56-golden-font-png-image_2919060.jpg",
  57: "https://png.pngtree.com/png-vector/20240607/ourlarge/pngtree-golden-color-number-57-illustration-png-image_12643337.png",
  58: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-58-3d-rendering-png-image_6052567.jpg",
  59: "https://png.pngtree.com/png-vector/20240607/ourmid/pngtree-golden-color-number-59-illustration-png-image_12643340.png",
  60: "https://png.pngtree.com/png-clipart/20240718/original/pngtree-golden-color-number-60-illustration-png-image_15582123.png",
  61: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-61-3d-rendering-png-image_6054759.jpg",
  62: "https://png.pngtree.com/png-clipart/20210301/ourmid/pngtree-number-62-3d-rendering-png-image_2995862.jpg",
  63: "https://png.pngtree.com/png-clipart/20210301/ourmid/pngtree-number-63-3d-rendering-png-image_2995865.jpg",
  64: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-64-3d-rendering-png-image_6052572.jpg",
  65: "https://png.pngtree.com/png-clipart/20210218/ourmid/pngtree-number-65-golden-font-png-image_2920428.jpg",
  66: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-66-3d-rendering-png-image_6052574.jpg",
  67: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-67-3d-rendering-png-image_6052575.jpg",
  68: "https://png.pngtree.com/png-clipart/20210301/ourmid/pngtree-number-68-3d-rendering-png-image_2995874.jpg",
  69: "https://png.pngtree.com/png-clipart/20210218/ourmid/pngtree-number-69-golden-font-png-image_2920432.jpg",
  70: "https://png.pngtree.com/png-clipart/20210301/ourmid/pngtree-number-70-3d-rendering-png-image_2995878.jpg",
  71: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-71-golden-font-png-image_6002640.jpg",
  72: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-72-3d-rendering-png-image_6052582.jpg",
  73: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-73-golden-font-png-image_6002642.jpg",
  74: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-74-3d-rendering-png-image_6052584.jpg",
  75: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-75-golden-font-png-image_6002644.jpg",
  76: "https://png.pngtree.com/png-vector/20240607/ourlarge/pngtree-golden-color-number-76-illustration-png-image_12643448.png",
  77: "https://png.pngtree.com/png-vector/20240607/ourlarge/pngtree-golden-color-number-77-illustration-png-image_12643378.png",
  78: "https://png.pngtree.com/png-clipart/20210301/ourmid/pngtree-number-78-3d-rendering-png-image_2995894.png",
  79: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-79-golden-font-png-image_6002648.jpg",
  80: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-80-golden-font-png-image_6002669.jpg",  
  81: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-81-golden-font-png-image_6002649.jpg",
  82: "https://png.pngtree.com/png-clipart/20210301/ourmid/pngtree-number-82-3d-rendering-png-image_2996403.jpg",
  83: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-83-golden-font-png-image_6002651.jpg",
  84: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-84-golden-font-png-image_6002652.jpg",
  85: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-85-golden-font-png-image_6002653.jpg",
  86: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-86-3d-rendering-png-image_6052594.jpg",
  87: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-87-3d-rendering-png-image_6052595.jpg",
  88: "https://png.pngtree.com/png-clipart/20210301/ourmid/pngtree-number-88-3d-rendering-png-image_2995906.jpg",
  89: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-89-3d-rendering-png-image_6057293.jpg",
  90: "https://png.pngtree.com/png-vector/20240607/ourlarge/pngtree-golden-color-number-90-illustration-png-image_12643393.png",
  91: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-91-3d-rendering-png-image_6057295.jpg",
  92: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-92-3d-rendering-png-image_6054948.jpg",
  93: "https://png.pngtree.com/png-clipart/20210301/ourmid/pngtree-number-93-3d-rendering-png-image_2995916.jpg",
  94: "https://png.pngtree.com/png-clipart/20210301/ourmid/pngtree-number-94-3d-rendering-png-image_2995918.jpg",
  95: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-95-3d-rendering-png-image_6052603.jpg",
  96: "https://png.pngtree.com/png-clipart/20210301/ourmid/pngtree-number-96-3d-rendering-png-image_2995924.jpg",
  97: "https://png.pngtree.com/png-clipart/20210301/ourmid/pngtree-number-97-3d-rendering-png-image_2995926.jpg",
  98: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-98-3d-rendering-png-image_6052607.jpg",
  99: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-number-99-3d-rendering-png-image_6052609.jpg",
  100: "https://thumbs.dreamstime.com/b/large-red-number-swirly-patterns-shiny-finish-perfect-birthday-card-red-number-white-background-387693912.jpg"
};

// Get image URL for the number
const getNumberImageUrl = (num) => numberImages[num] || `https://via.placeholder.com/200?text=${num}`;

const SingleNumberPage = () => {
  const { number } = useParams();
  const navigate = useNavigate();
  const [currentNumber, setCurrentNumber] = useState(parseInt(number));

  useEffect(() => {
    speakNumber(currentNumber);
  }, [currentNumber]);

  const speakNumber = (n) => {
    if (!n || !numberWords[n]) return;
    const utterance = new SpeechSynthesisUtterance(n.toString());
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      (v) => v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("zira")
    );
    if (femaleVoice) utterance.voice = femaleVoice;
    window.speechSynthesis.speak(utterance);
  };

  const speakLetters = (n) => {
    if (!n || !numberWords[n]) return;
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
      <div className="number-content" style={{ textAlign: "center" }}>
        <button className="back-btn" onClick={() => navigate("/numbers")}>
          Back to Numbers
        </button>

        <h2>{currentNumber}</h2>

        <div className="image-container">
          <img
            src={getNumberImageUrl(currentNumber)}
            alt={currentNumber}
            onClick={() => speakLetters(currentNumber)}
          />
          <p className="number-word">{numberWords[currentNumber]}</p>
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
    </div>
  );
};

export default SingleNumberPage;
