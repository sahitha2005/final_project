import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SingleLetterPage.css";

// Full images object with words for A-Z
const images = {
  A: { word: "Aeroplane", url: "https://media.istockphoto.com/id/986387152/photo/airplane-isolated-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=BVJGtQAwLJKKs8OAwqsdBILSXuaZ9BR7ZN23eteHyzc=" },
  B: { word: "Ball", url: "https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFsbHxlbnwwfHwwfHx8MA%3D%3D" },
  C: { word: "Cat", url: "https://plus.unsplash.com/premium_photo-1664299749481-ac8dc8b49754?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2F0fGVufDB8fDB8fHww" },
  D: { word: "Dog", url: "https://plus.unsplash.com/premium_photo-1666777247416-ee7a95235559?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9nfGVufDB8fDB8fHww" },
  E: { word: "Elephant", url: "https://images.unsplash.com/photo-1526226128118-9ef71fc2f34b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVsZXBoYW50fGVufDB8fDB8fHww" },
  F: { word: "Fish", url: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmlzaHxlbnwwfHwwfHx8MA%3D%3D" },
  G: { word: "Grapes", url: "https://images.unsplash.com/photo-1596363505729-4190a9506133?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhcGVzfGVufDB8fDB8fHww" },
  H: { word: "Horse", url: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9yc2V8ZW58MHx8MHx8fDA%3D" },
  I: { word: "Ice cream", url: "https://media.istockphoto.com/id/157472912/photo/ice-cream-composition-on-a-bowl.webp?a=1&b=1&s=612x612&w=0&k=20&c=e1yPCusQJl2scx955yuv9LUcbx5e7OcARC_VgEDdz5Y=" },
  J: { word: "Jeep", url: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amVlcHxlbnwwfHwwfHx8MA%3D%3D" },
  K: { word: "Kite", url: "https://media.istockphoto.com/id/1197283278/photo/colorful-paper-kites-and-string-makar-sankranti-festival-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=pyvWxDO2mOu7Ypsv-kQXZO-WcxUeOUxtLOvxHRM6J4k=" },
  L: { word: "Lion", url: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGlvbnxlbnwwfHwwfHx8MA%3D%3D" },
  M: { word: "Monkey", url: "https://images.unsplash.com/photo-1605559911160-a3d95d213904?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9ua2V5fGVufDB8fDB8fHww" },
  N: { word: "Nest", url: "https://images.unsplash.com/photo-1439397629354-e2e3dea8f6f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmVzdHxlbnwwfHwwfHx8MA%3D%3D" },
  O: { word: "Orange", url: "https://plus.unsplash.com/premium_photo-1670512181061-e24282f7ee78?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b3JhbmdlfGVufDB8fDB8fHww" },
  P: { word: "Parrot", url: "https://images.unsplash.com/photo-1512819432727-dbcb57a06f13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGFycm90fGVufDB8fDB8fHww" },
  Q: { word: "Queen", url: "https://thumbs.dreamstime.com/b/cartoon-princess-character-portrait-beautiful-queen-tiara-gown-vibrant-adorned-sparkling-elegant-385988207.jpg" },
  R: { word: "Rabbit", url: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFiYml0fGVufDB8fDB8fHww" },
  S: { word: "Sun Flower", url: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VuJTIwZmxvd2VyfGVufDB8fDB8fHww" },
  T: { word: "Tiger", url: "https://images.unsplash.com/photo-1605092676920-8ac5ae40c7c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGlnZXJ8ZW58MHx8MHx8fDA%3D" },
  U: { word: "Unicorn", url: "https://media.istockphoto.com/id/1364557568/vector/cartoon-beautiful-unicorn-head-is-on-the-cloud-with-beautiful-flowers.jpg?s=612x612&w=0&k=20&c=SbeqG1k6Y1swx_GAmKYbz7mx9DnBJYH1eNDLi4ZCN0Y=" },
  V: { word: "Violin", url: "https://images.unsplash.com/photo-1704961625677-dc57dcf6cef1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHZpb2xpbnxlbnwwfHwwfHx8MA%3D%3D" },
  W: { word: "Watch", url: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2F0Y2h8ZW58MHx8MHx8fDA%3D" },
  X: { word: "Xylophone", url: "https://media.istockphoto.com/id/931357350/photo/the-hands-of-a-musician-playing-the-marimba.webp?a=1&b=1&s=612x612&w=0&k=20&c=S9dHwcgooLxzv4fx1vkUbyCBWXIGvloBMX6V5SLH_3Q=" },
  Y: { word: "Yak", url: "https://images.unsplash.com/photo-1551606712-b0341396cc87?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHlha3xlbnwwfHwwfHx8MA%3D%3D" },
  Z: { word: "Zebra", url: "https://images.unsplash.com/photo-1503656142023-618e7d1f435a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8emVicmF8ZW58MHx8MHx8fDA%3D" }
};

const letters = Object.keys(images);

const SingleLetterPage = () => {
  const { letter } = useParams();
  const navigate = useNavigate();
  const initialIndex = letters.indexOf(letter);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const currentLetter = letters[currentIndex];
  const currentData = images[currentLetter];

  // Pronounce letter when navigating
  useEffect(() => {
    speak(currentLetter);
  }, [currentLetter]);

  // Speak function with female voice
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
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
    if (currentIndex < letters.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="single-letter-page">
      <button className="back-btn" onClick={() => navigate("/alphabets")}>
        Back to Alphabets
      </button>

      <div className="letter-content">
  <h2>{currentLetter}</h2>
  <div className="image-container">
    <img
      src={currentData.url}
      alt={currentLetter}
      className="letter-image"
      onClick={() => speak(currentData.word)}
      style={{ cursor: "pointer" }}
    />
    <p className="image-word">{currentData.word}</p>
  </div>
</div>

      <div className="navigation-buttons">
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === letters.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SingleLetterPage;
