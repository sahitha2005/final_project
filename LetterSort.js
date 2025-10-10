import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LetterSort.css';

const words = ['CAT','DOG','APPLE','BALL','TREE','FISH','LION','MONKEY'];

export default function LetterSort() {
  const navigate = useNavigate();
  const [wordIndex, setWordIndex] = useState(0);
  const [letters, setLetters] = useState([]);
  const [slots, setSlots] = useState([]);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [showScoreCard, setShowScoreCard] = useState(false);

  // Prepare letters for current word
  useEffect(() => {
    if(wordIndex >= words.length){
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

    // Check correctness immediately
    const currentWord = words[wordIndex];
    if(newSlots.join('') === currentWord){
      setLocked(true);
      setScore(score + 1);
      speak('Correct!');
    } else {
      // If slot filled but not correct yet, allow retry
      speak('Try again');
    }
  };

  const next = () => {
    if(wordIndex < words.length - 1){
      setWordIndex(wordIndex + 1);
    } else {
      setShowScoreCard(true);
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
      <h1>Build the Word Game</h1>
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
        <button onClick={next} className="next-btn">Next</button>
        <button onClick={retry} className="retry-btn">Retry</button>
        <button onClick={() => navigate('/activities')} className="back-btn">Back to Menu</button>
      </div>
    </div>
  );
}
