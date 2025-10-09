import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SingleShapePage.css";

// Shape images (4 per shape)
const shapeImages = {
  Circle: [
    "https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?q=80&w=749&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1694670121843-79b433c4ed59?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1683121823310-121e5fe5a06d?q=80&w=822&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ],
  Square: [
    "https://images.unsplash.com/photo-1541746972996-4f0d9b062dd1?w=500",
    "https://images.unsplash.com/photo-1533089860892-a7b6b7f91c9f?w=500",
    "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=500",
    "https://images.unsplash.com/photo-1526040652367-ac003a0475fe?w=500"
  ],
  Triangle: [
    "https://www.shutterstock.com/image-photo/pepperoni-pizza-slice-on-transparent-600w-2585448637.jpg",
    "https://media.istockphoto.com/id/896016050/photo/sliced-fresh-watermelon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=sG242w73XH0-B-_0_YgcnJd8AgHHsKpBN5CCHhlpwyE=",
    "https://images.unsplash.com/photo-1633431420170-acb0bb78c6f9?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1622715395488-71045e2a4990?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ],
  Rectangle: [
    "https://tressadoors.in/cdn/shop/files/modern-wooden-interior-door-horizontal-panel-brown-finishmodern-wooden-interior-door-horizontal-panel-brown-finish-865473.png",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1620275765334-4ed948bb4502?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1165&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ],
  Star: [
    "https://plus.unsplash.com/premium_photo-1661764559771-8f78623b352c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://img.lb.wbmdstatic.com/vim/live/webmd/consumer_assets/site_images/articles/health_tools/11_exotic_fruits_you_should_try_slideshow/1800ss_getty_rf_star_fruit_carambola.jpg",
    "https://plus.unsplash.com/premium_photo-1722811315330-f14d4bad3a9d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://thumbs.dreamstime.com/b/pink-star-shaped-magic-wand-shiny-stars-pink-star-shaped-magic-wand-shiny-stars-white-background-137737507.jpg"
  ],
  Rhombus: [
    "https://5.imimg.com/data5/SELLER/Default/2023/9/341279512/GV/WL/HZ/69063882/13-gsm-rhombus-paper-kite.jpg",
    "https://numberdyslexia.com/wp-content/uploads/2023/05/images-13-3.jpg",
    "https://i.pinimg.com/564x/12/30/c0/1230c0a06581dc339775dc1bede85f1c.jpg",
    "https://cpimg.tistatic.com/09487966/b/4/Traffic-Sign-Board.jpg"
  ],
  Pentagon: [
    "https://images.unsplash.com/photo-1530007550359-6e0c2c6b01e6?w=500",
    "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=500",
    "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=500",
    "https://images.unsplash.com/photo-1503602642458-232111445657?w=500"
  ],
  Oval: [
    "https://images.unsplash.com/photo-1614608666214-b6de69b43cf6?w=500",
    "https://images.unsplash.com/photo-1602397495337-f2b5dc839b2d?w=500",
    "https://images.unsplash.com/photo-1509099836639-18ba0f92d6c0?w=500",
    "https://images.unsplash.com/photo-1612831455547-c22ab933f9d1?w=500"
  ],
  SemiCircle: [
    "https://images.unsplash.com/photo-1541746972996-4f0d9b062dd1?w=500",
    "https://images.unsplash.com/photo-1533089860892-a7b6b7f91c9f?w=500",
    "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=500",
    "https://images.unsplash.com/photo-1526040652367-ac003a0475fe?w=500"
  ],
  Hexagon: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500",
    "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=500",
    "https://images.unsplash.com/photo-1533622597524-a121c0f4b3e0?w=500",
    "https://images.unsplash.com/photo-1549989473-1f6f48cfdeeb?w=500"
  ]
};

const shapes = Object.keys(shapeImages);

const SingleShapePage = () => {
  const { shape } = useParams();
  const navigate = useNavigate();

  const initialIndex = shapes.indexOf(shape);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const currentShape = shapes[currentIndex];
  const currentImages = shapeImages[currentShape];

  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(currentShape);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  }, [currentShape]);

  const handleNext = () => {
    if (currentIndex < shapes.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="single-shape-page">
      <button className="back-btn" onClick={() => navigate("/shapes")}>
        Back to Shapes
      </button>

      <h2>{currentShape}</h2>

      <div className="shape-images-grid">
        {currentImages.map((imgUrl, idx) => (
          <img
            key={idx}
            src={imgUrl}
            alt={`${currentShape}-${idx}`}
            className="shape-image"
            onClick={() => {
              const utterance = new SpeechSynthesisUtterance(currentShape);
              utterance.rate = 0.8;
              utterance.pitch = 1.2;
              window.speechSynthesis.speak(utterance);
            }}
          />
        ))}
      </div>

      <div className="navigation-buttons">
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === shapes.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SingleShapePage;
