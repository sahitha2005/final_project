import React from "react";
import { useNavigate } from "react-router-dom";
import "./ColorsPage.css";

// Colors and a sample thumbnail (can use the first image from SingleColorPage)
const colorsData = {
  Red: "https://colorcodes.imgix.net/4aNWbQXflJUTIOfB1YVKTl/7fa85376d10404124d8900f2383ba400/dark-red-color.png",
  Blue: "https://img.freepik.com/premium-photo/full-frame-shot-blue-background_1048944-6189296.jpg?semt=ais_hybrid&w=740&q=80",
  Green: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbXgGZ03XsqY-oy74FakcidNHLompiBZSqoA&s",
  Yellow: "https://img.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_58702-5912.jpg?semt=ais_hybrid&w=740&q=80",
  Purple: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7NtezOf8lyuDsd8a_5rSM4TpPYP5aXO3gA&s",
  Orange: "https://img.freepik.com/free-photo/abstract-smooth-orange-background-layout-design-studio-room-web-template-business-report-with-smooth-circle-gradient-color_1258-79739.jpg?semt=ais_hybrid&w=740&q=80",
  Pink: "https://img.freepik.com/free-vector/abstract-pink-background_698452-702.jpg?semt=ais_hybrid&w=740&q=80",
  Brown: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9mnW8bk_B8rmyZc1GiI_12i34OZkM_JxIFQ&s",
  Black: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Black.png/250px-Black.png",
  White: "https://www.ober-surfaces.com/cache/images/product/34173cb38f07f89ddbebc2ac9128303f-1301-oberflex_purepapercolor_clawed_white001_detail.jpg",
  // Add more colors as needed
};

const ColorsPage = () => {
  const navigate = useNavigate();

  const handleColorClick = (color) => {
    navigate(`/colors/${color}`);
  };

  return (
    <div className="colors-grid-page">
      <button className="back-btn" onClick={() => navigate("/topics")}>
        Back to Topics
      </button>

      
      <div className="colors-grid">
        {Object.keys(colorsData).map((color) => (
          <div
            key={color}
            className="color-card"
            onClick={() => handleColorClick(color)}
          >
            <img src={colorsData[color]} alt={color} />
            <p className="color-name">{color}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorsPage;
