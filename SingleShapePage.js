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
    "https://plus.unsplash.com/premium_photo-1671305112886-f43c82172297?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGNoZXNzJTIwYm9hcmR8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1723641930574-7c0ef45ccca6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3F1YXJlJTIwY2xvY2t8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1600359773269-0e5197c3829b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGl6emElMjBib3h8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1617300067484-314ed2cfd9a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fycm9tJTIwYm9hcmR8ZW58MHx8MHx8fDA%3D"
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
    "https://upload.wikimedia.org/wikipedia/commons/b/b6/Pentagonal_prism.png",
    "https://i.ytimg.com/vi/p_ENhKu836I/maxresdefault.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Phe_p3A3AP_sGMQ0DJSzcbsYXL7E7n0TCw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYb6UQISIIgr97BV6YHFHXj8EwEo8apfIqEw&s"
  ],
  Oval: [
    "https://media.istockphoto.com/id/1317493024/photo/american-rugby-ball-on-the-grass-in-the-stadium.webp?a=1&b=1&s=612x612&w=0&k=20&c=lEY9mZH7w2jPp_qeIvj0ra8txOsJpBQ8TVlSCDt2WJ0=",
    "https://media.istockphoto.com/id/1366357877/photo/fresh-fruit-glossy-black-watermelon-isolated-on-white-background-selective-focus.webp?a=1&b=1&s=612x612&w=0&k=20&c=oh_mQjyMNzOhizRbqkY_H9OSLqMpx2JVJAju27Cp-1g=",
    "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVnZ3N8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1609889132698-1625aefc7f6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8S2l3aShmcnVpdCl8ZW58MHx8MHx8fDA%3D"
  ],
  SemiCircle: [
    "https://images.unsplash.com/photo-1593362831502-5c3ad1c05f57?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFpbmJvd3xlbnwwfHwwfHx8MA%3D%3D",
    "https://media.istockphoto.com/id/185111174/photo/lime-slice.webp?a=1&b=1&s=612x612&w=0&k=20&c=WA80Rbad0qabPpmUEXjv4pg0FhGfr_VD1atEidD2bzU=",
    "https://images.unsplash.com/photo-1527842891421-42eec6e703ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TW9vbnxlbnwwfHwwfHx8MA%3D%3D",
    "https://media.istockphoto.com/id/828667894/photo/watermelon-on-blue-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=3J-1oEPYIaN5XyxksiPzFYZ-LnkUZ3KmVRi9T-QjEPA="
  ],
  Hexagon: [
    "https://m.media-amazon.com/images/I/31HgIajaiDL._UF894,1000_QL80_.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvPScDQDBUx115J6Zm2lrKBGckhMxw_cSNj0EIkj_6BmSeQW6XWBhTy3spmiT60hCzDiY&usqp=CAU",
    "https://media.istockphoto.com/id/1079142536/photo/3d-illustration-of-a-black-honeycomb-shaped-shelf.jpg?s=612x612&w=0&k=20&c=XJRosyMmdkGvgBKCF2W0yBY8H_JnsvV5oYpLmD82Clc=",
    "https://t4.ftcdn.net/jpg/17/09/50/55/360_F_1709505592_9r7DrKaz3ndcz2Q1mKTXyy89EgGC5qlc.jpg"
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
