import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LetterSort.css';

const words = ['CAT','DOG','APPLE','BALL','TREE','FISH','LION','MONKEY','NEST','QUEEN','RABBIT','TIGER','ZEBRA','SUN','FLOWER'];

export default function LetterSort() {
  const navigate = useNavigate();
  const [wordIndex, setWordIndex] = useState(0);
  const [letters, setLetters] = useState([]);
  const [slots, setSlots] = useState([]);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [showScoreCard, setShowScoreCard] = useState(false);

  const childName = localStorage.getItem("childName") || "Unknown User";

  // Prepare letters for the current word
  useEffect(() => {
    if (wordIndex >= words.length) {
      setShowScoreCard(true);
      return;
    }
    const word = words[wordIndex];
    const shuffled = word.split('').sort(() => Math.random() - 0.5);
    setLetters(shuffled);
    setSlots(Array(word.length).fill(''));
    setLocked(false);
  }, [wordIndex]);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira'));
    if(femaleVoice) utterance.voice = femaleVoice;
    window.speechSynthesis.speak(utterance);
  };

  // Save score to backend
  const saveScore = async (childName, score, total) => {
    try {
      const response = await fetch("http://localhost:5000/saveScore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childName,
          quizType: "Build Word Quiz",
          score,
          total,
          date: new Date(),
        }),
      });
      const result = await response.json();
      console.log("✅ Build Word score saved:", result.message);
    } catch (error) {
      console.error("❌ Error saving Build Word score:", error);
    }
  };

  // Called when quiz finishes
  const finishQuiz = () => {
    setShowScoreCard(true);
    saveScore(childName, score, words.length);
  };

  // Handle drop and automatic question change
  const handleDrop = (letter, idx) => {
    if (locked) return;
    const newLetters = [...letters];
    const letterIndex = newLetters.indexOf(letter);
    if(letterIndex !== -1){
      newLetters.splice(letterIndex, 1);
    }
    const newSlots = [...slots];
    newSlots[idx] = letter;
    setLetters(newLetters);
    setSlots(newSlots);

    const currentWord = words[wordIndex];
    if(newSlots.join('') === currentWord){
      setLocked(true);
      setScore(prev => prev + 1);
      speak('Correct!');

      setTimeout(() => {
        if(wordIndex < words.length - 1){
          setWordIndex(wordIndex + 1);
        } else {
          finishQuiz(); // ✅ Save score here
        }
      }, 1000);

    } else {
      speak('Try again');
    }
  };

  const next = () => {
    if(wordIndex < words.length - 1){
      setWordIndex(wordIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const previous = () => {
    if(wordIndex > 0){
      setWordIndex(wordIndex - 1);
    }
  };

  const retry = () => {
    const word = words[wordIndex];
    const shuffled = word.split('').sort(() => Math.random() - 0.5);
    setLetters(shuffled);
    setSlots(Array(word.length).fill(''));
    setLocked(false);
  };

  if(showScoreCard){
    return (
      <div className="letter-sort">
        <div className="score-card">
          <h1>🎉 Your Score 🎉</h1>
          <p>{score} / {words.length}</p>
          <button className="back-btn" onClick={() => navigate('/activities')}>Back to Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="letter-sort">
      <h1>Build the Word </h1>
      <div className="score">Score: {score}</div>
      <div className="slots">
        {slots.map((s,i) => (
          <div key={i} className={`slot ${locked ? (s===words[wordIndex][i]?'correct':'wrong') : ''}`}
               onDragOver={(e)=>e.preventDefault()}
               onDrop={(e)=>handleDrop(e.dataTransfer.getData('text'), i)}>
            {s}
          </div>
        ))}
      </div>
      <div className="letters">
        {letters.map((l,i) => (
          <div key={i} draggable onDragStart={(e)=>e.dataTransfer.setData('text', l)} className="letter">{l}</div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={previous} className="prev-btn" disabled={wordIndex===0}>Previous</button>
        <button onClick={next} className="next-btn">Next</button>
        <button onClick={retry} className="retry-btn">Retry</button>
        <button onClick={() => navigate('/activities')} className="back-btn">Back to Menu</button>
      </div>
    </div>
  );
}
