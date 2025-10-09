import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WordImageMatch.css';

const data = [
  { word: 'Apple', images: ['https://i.ibb.co/7CQVJNm/apple.jpg','https://i.ibb.co/3kWj5q0/banana.jpg','https://i.ibb.co/9cLqK7H/grapes.jpg','https://i.ibb.co/YkZV9cH/strawberry.jpg'], correct: 0 },
  { word: 'Ball', images: ['https://i.ibb.co/xmRkNQ7/soccerball.jpg','https://i.ibb.co/4PV6K4D/basketball.jpg','https://i.ibb.co/1R3VvJS/tennisball.jpg','https://i.ibb.co/6YXm9L9/football.jpg'], correct: 0 },
  { word: 'Cat', images: ['https://i.ibb.co/PW2tVdP/cat.jpg','https://i.ibb.co/WzLhY8c/dog.jpg','https://i.ibb.co/2g5s3Y0/mouse.jpg','https://i.ibb.co/6Dg3VgD/rabbit.jpg'], correct: 0 },
  { word: 'Dog', images: ['https://i.ibb.co/WzLhY8c/dog.jpg','https://i.ibb.co/PW2tVdP/cat.jpg','https://i.ibb.co/2g5s3Y0/mouse.jpg','https://i.ibb.co/6Dg3VgD/rabbit.jpg'], correct: 0 },
  { word: 'Elephant', images: ['https://i.ibb.co/XtQW8kQ/elephant.jpg','https://i.ibb.co/k0yD9xT/rhino.jpg','https://i.ibb.co/YXYjzYh/giraffe.jpg','https://i.ibb.co/5jK3L1R/lion.jpg'], correct: 0 },
  { word: 'Fish', images: ['https://i.ibb.co/3k1XjV5/fish.jpg','https://i.ibb.co/2Mkb8KC/fish2.jpg','https://i.ibb.co/dGqRz0v/shark.jpg','https://i.ibb.co/7W9nN9v/pufferfish.jpg'], correct: 0 },
  { word: 'Grapes', images: ['https://i.ibb.co/9cLqK7H/grapes.jpg','https://i.ibb.co/7CQVJNm/apple.jpg','https://i.ibb.co/3kWj5q0/banana.jpg','https://i.ibb.co/YkZV9cH/strawberry.jpg'], correct: 0 },
  { word: 'Horse', images: ['https://i.ibb.co/Y2yR6QL/horse.jpg','https://i.ibb.co/4PV6K4D/cow.jpg','https://i.ibb.co/1R3VvJS/pig.jpg','https://i.ibb.co/WzLhY8c/chicken.jpg'], correct: 0 },
  { word: 'Ice Cream', images: ['https://i.ibb.co/9vM6Lf1/icecream.jpg','https://i.ibb.co/7W9nN9v/cupcake.jpg','https://i.ibb.co/dGqRz0v/chocolate.jpg','https://i.ibb.co/7CQVJNm/apple.jpg'], correct: 0 },
  { word: 'Jeep', images: ['https://i.ibb.co/0rX5p3n/jeep.jpg','https://i.ibb.co/2Mkb8KC/car.jpg','https://i.ibb.co/3kWj5q0/truck.jpg','https://i.ibb.co/6YXm9L9/bike.jpg'], correct: 0 },
  { word: 'Kite', images: ['https://i.ibb.co/6t2vPQ6/kite.jpg','https://i.ibb.co/7CQVJNm/balloon.jpg','https://i.ibb.co/YkZV9cH/fish.jpg','https://i.ibb.co/9cLqK7H/cup.jpg'], correct: 0 },
  { word: 'Lion', images: ['https://i.ibb.co/5jK3L1R/lion.jpg','https://i.ibb.co/XtQW8kQ/tiger.jpg','https://i.ibb.co/k0yD9xT/bear.jpg','https://i.ibb.co/YXYjzYh/panda.jpg'], correct: 0 },
  { word: 'Monkey', images: ['https://i.ibb.co/6Dg3VgD/monkey.jpg','https://i.ibb.co/PW2tVdP/gorilla.jpg','https://i.ibb.co/WzLhY8c/orangutan.jpg','https://i.ibb.co/3kWj5q0/lemur.jpg'], correct: 0 },
  { word: 'Nest', images: ['https://i.ibb.co/2g5s3Y0/nest.jpg','https://i.ibb.co/6Dg3VgD/bird.jpg','https://i.ibb.co/WzLhY8c/egg.jpg','https://i.ibb.co/7CQVJNm/leaf.jpg'], correct: 0 },
  { word: 'Orange', images: ['https://i.ibb.co/3kWj5q0/orange.jpg','https://i.ibb.co/7CQVJNm/apple.jpg','https://i.ibb.co/9cLqK7H/banana.jpg','https://i.ibb.co/YkZV9cH/grapes.jpg'], correct: 0 },
  { word: 'Parrot', images: ['https://i.ibb.co/6Dg3VgD/parrot.jpg','https://i.ibb.co/2Mkb8KC/sparrow.jpg','https://i.ibb.co/7W9nN9v/pigeon.jpg','https://i.ibb.co/YXYjzYh/crow.jpg'], correct: 0 },
  { word: 'Queen', images: ['https://i.ibb.co/7W9nN9v/queen.jpg','https://i.ibb.co/0rX5p3n/princess.jpg','https://i.ibb.co/4PV6K4D/king.jpg','https://i.ibb.co/YkZV9cH/prince.jpg'], correct: 0 },
  { word: 'Rabbit', images: ['https://i.ibb.co/6Dg3VgD/rabbit.jpg','https://i.ibb.co/2g5s3Y0/hamster.jpg','https://i.ibb.co/WzLhY8c/mouse.jpg','https://i.ibb.co/7CQVJNm/guinea.jpg'], correct: 0 },
  { word: 'Sun Flower', images: ['https://i.ibb.co/7CQVJNm/sunflower.jpg','https://i.ibb.co/9cLqK7H/rose.jpg','https://i.ibb.co/3kWj5q0/tulip.jpg','https://i.ibb.co/YkZV9cH/daisy.jpg'], correct: 0 },
  { word: 'Tiger', images: ['https://i.ibb.co/XtQW8kQ/tiger.jpg','https://i.ibb.co/5jK3L1R/lion.jpg','https://i.ibb.co/k0yD9xT/bear.jpg','https://i.ibb.co/YXYjzYh/panda.jpg'], correct: 0 },
  { word: 'Unicorn', images: ['https://i.ibb.co/6Dg3VgD/unicorn.jpg','https://i.ibb.co/PW2tVdP/horse.jpg','https://i.ibb.co/WzLhY8c/pony.jpg','https://i.ibb.co/3kWj5q0/zebra.jpg'], correct: 0 },
  { word: 'Violin', images: ['https://i.ibb.co/9cLqK7H/violin.jpg','https://i.ibb.co/7CQVJNm/guitar.jpg','https://i.ibb.co/YkZV9cH/keyboard.jpg','https://i.ibb.co/3kWj5q0/drum.jpg'], correct: 0 },
  { word: 'Watch', images: ['https://i.ibb.co/XtQW8kQ/watch.jpg','https://i.ibb.co/5jK3L1R/clock.jpg','https://i.ibb.co/k0yD9xT/alarm.jpg','https://i.ibb.co/YXYjzYh/timer.jpg'], correct: 0 },
  { word: 'Xylophone', images: ['https://i.ibb.co/9cLqK7H/xylophone.jpg','https://i.ibb.co/7CQVJNm/guitar.jpg','https://i.ibb.co/YkZV9cH/drum.jpg','https://i.ibb.co/3kWj5q0/piano.jpg'], correct: 0 },
  { word: 'Yak', images: ['https://i.ibb.co/6Dg3VgD/yak.jpg','https://i.ibb.co/PW2tVdP/cow.jpg','https://i.ibb.co/WzLhY8c/bull.jpg','https://i.ibb.co/3kWj5q0/ox.jpg'], correct: 0 },
  { word: 'Zebra', images: ['https://i.ibb.co/5jK3L1R/zebra.jpg','https://i.ibb.co/XtQW8kQ/horse.jpg','https://i.ibb.co/k0yD9xT/donkey.jpg','https://i.ibb.co/YXYjzYh/pony.jpg'], correct: 0 }
];

export default function WordImageMatch() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const item = data[index];

  const handleClick = (i) => {
    if (selected !== null) return;
    setSelected(i);
    const utterance = new SpeechSynthesisUtterance(i === item.correct ? 'Correct!' : 'Try again');
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira'));
    if(femaleVoice) utterance.voice = femaleVoice;
    window.speechSynthesis.speak(utterance);
    if (i === item.correct) setScore(score + 1);
  };

  const next = () => {
    if (index < data.length - 1) {
      setSelected(null);
      setIndex(index + 1);
    } else {
      alert(`Game Over! Your Score: ${score}/${data.length}`);
      navigate('/activities');
    }
  };

  return (
    <div className="word-match">
      <h1>Word–Image Match Game</h1>
      <div className="score">Score: {score}</div>
      <div className="word">Select the picture for: <strong>{item.word}</strong></div>
      <div className="grid">
        {item.images.map((img, i) => {
          let border = 'gray';
          if (selected !== null) border = i === item.correct ? 'green' : i === selected ? 'red' : 'gray';
          return (
            <img key={i} className="image-btn" src={img} alt="option" style={{borderColor: border}} onClick={() => handleClick(i)} />
          );
        })}
      </div>
      <div className="buttons">
        <button onClick={next} className="next-btn">Next</button>
        <button onClick={() => navigate('/activities')} className="back-btn">Back to Menu</button>
      </div>
    </div>
  );
}