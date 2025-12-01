import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SingleAnimalPage.css";

// ⭐ Paste YOUR real image URLs here
const animalImages = {
  Dog: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN2z0ERwXQUqH29urPuzWueLXKhJAY6SMyAA&s",
  Cat: "https://m.media-amazon.com/images/I/41QZSg8drOL._AC_UF894,1000_QL80_.jpg",
  Goat: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbL_CglUlWLL2eRNQNws2BS6KkX5MZTay5gg&s",
  Sheep: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSONVPDibgMBezZ9mwvs9L0dRC623yeKsQcfA&s",
  Lion: "https://static.vecteezy.com/system/resources/thumbnails/026/525/162/small/lion-animal-isolated-photo.jpg",
  Elephant: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSEYeU2LHDFVw5a5eLHqXE0FcTLX9jxSt5iA&s",
  Pig: "https://static.vecteezy.com/system/resources/thumbnails/055/521/571/small/adorable-piglet-influencer-with-stylish-bow-in-farm-background-showcasing-trendy-look-and-playful-expression-photo.jpg",
  Bear: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSTf5hNTJ5zqJhi8MeGrp_8lXjvQ_-WYaAjg&s",
  Tiger: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1m48JDx5jGrVvmMnYqr8zte_LCfe6dI6MFw&s",
  Wolf: "https://upload.wikimedia.org/wikipedia/commons/6/68/Eurasian_wolf_2.jpg",
};

const animals = Object.keys(animalImages);

const SingleAnimalPage = () => {
  const { animal } = useParams();
  const navigate = useNavigate();

  const initialIndex = animals.indexOf(animal);
  const safeIndex = initialIndex === -1 ? 0 : initialIndex;

  const [currentIndex, setCurrentIndex] = useState(safeIndex);

  const currentAnimal = animals[currentIndex];
  const currentImage = animalImages[currentAnimal];

  // Speak animal name on load
  useEffect(() => {
    const utter = new SpeechSynthesisUtterance(currentAnimal);
    utter.rate = 0.8;
    utter.pitch = 1.2;
    window.speechSynthesis.speak(utter);
  }, [currentAnimal]);

  const handleNext = () => {
    if (currentIndex < animals.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="single-color-page">
      <button className="back-btn" onClick={() => navigate("/animals")}>
        Back to Animals
      </button>

      <h2>{currentAnimal}</h2>

      {/* One image only */}
      <div className="single-image-container">
        <img
          src={currentImage}
          alt={currentAnimal}
          className="single-big-image"
          onClick={() => {
            const speak = new SpeechSynthesisUtterance(currentAnimal);
            speak.rate = 0.8;
            speak.pitch = 1.2;
            window.speechSynthesis.speak(speak);
          }}
        />
      </div>

      {/* Next / Previous buttons */}
      <div className="navigation-buttons">
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === animals.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SingleAnimalPage;
