import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LetterSort.css';


const words = ['CAT','DOG','APPLE'];


export default function LetterSort() {
const navigate = useNavigate();
const [wordIndex, setWordIndex] = useState(0);
const [letters, setLetters] = useState([]);
const [slots, setSlots] = useState([]);
const [locked, setLocked] = useState(false);
const [score, setScore] = useState(0);


useEffect(() => {
const word = words[wordIndex % words.length];
const shuffled = word.split('').sort(() => Math.random() - 0.5);
setLetters(shuffled);
setSlots(Array(word.length).fill(''));
setLocked(false);
}, [wordIndex]);


const handleDrop = (letter, idx) => {
if (locked) return;
const newLetters = letters.filter(l => l !== letter);
const newSlots = [...slots];
newSlots[idx] = letter;
setLetters(newLetters);
setSlots(newSlots);
};


const check = () => {
if (slots.join('') === words[wordIndex % words.length]) setScore(score + 1);
setLocked(true);
};


const next = () => setWordIndex(wordIndex + 1);


return (
<div className="letter-sort">
<h1>Build the Word Game</h1>
<div className="score">Score: {score}</div>
<div className="slots">
{slots.map((s,i) => (
<div key={i} className={`slot ${locked ? (s===words[wordIndex % words.length][i]?'correct':'wrong') : ''}`} onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>handleDrop(e.dataTransfer.getData('text'), i)}>{s}</div>
))}
</div>
<div className="letters">
{letters.map((l,i) => (
<div key={i} draggable onDragStart={(e)=>e.dataTransfer.setData('text', l)} className="letter">{l}</div>
))}
</div>
<div className="buttons">
<button onClick={check} className="check-btn">Check</button>
<button onClick={next} className="next-btn">Next</button>
<button onClick={() => navigate('/activities')} className="back-btn">Back to Menu</button>
</div>
</div>
);
}