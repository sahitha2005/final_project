import React from "react";
import { useNavigate } from "react-router-dom";
import "./ColorsPage.css";

const colorsData = [
  { name: "Red", url: "https://colorcodes.imgix.net/4aNWbQXflJUTIOfB1YVKTl/7fa85376d10404124d8900f2383ba400/dark-red-color.png" },
  { name: "Blue", url: "https://img.freepik.com/premium-photo/full-frame-shot-blue-background_1048944-6189296.jpg?semt=ais_hybrid&w=740&q=80" },
  { name: "Green", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbXgGZ03XsqY-oy74FakcidNHLompiBZSqoA&s" },
  { name: "Yellow", url: "https://img.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_58702-5912.jpg?semt=ais_hybrid&w=740&q=80" },
  { name: "Purple", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7NtezOf8lyuDsd8a_5rSM4TpPYP5aXO3gA&s" },
  { name: "Orange", url: "https://img.freepik.com/free-photo/abstract-smooth-orange-background-layout-design-studio-room-web-template-business-report-with-smooth-circle-gradient-color_1258-79739.jpg?semt=ais_hybrid&w=740&q=80" },
  { name: "Pink", url: "https://img.freepik.com/free-vector/abstract-pink-background_698452-702.jpg?semt=ais_hybrid&w=740&q=80" },
  { name: "Brown", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9mnW8bk_B8rmyZc1GiI_12i34OZkM_JxIFQ&s" },
  { name: "Black", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Black.png/250px-Black.png" },
  { name: "White", url: "https://www.ober-surfaces.com/cache/images/product/34173cb38f07f89ddbebc2ac9128303f-1301-oberflex_purepapercolor_clawed_white001_detail.jpg" },
];

export default function ColorsPage() {
  const navigate = useNavigate();

  return (
    <div className="colors-page-container">
      {/* Top Center Back Button */}
      <div className="button-top-center">
        <button className="back-btn" onClick={() => navigate("/topics")}>
          Back to Colors
        </button>
      </div>

      {/* Colors Grid */}
      <div className="colors-grid">
        {colorsData.map((color) => (
          <div
            key={color.name}
            className="color-card"
            onClick={() => navigate(`/colors/${color.name}`)}
          >
            <img src={color.url} alt={color.name} />
            <p className="color-name">{color.name}</p>
          </div>
        ))}
      </div>

      {/* Bottom Center Start Quiz Button */}
      <div className="button-bottom-center">
        <button
          className="start-quiz-btn"
          onClick={() => navigate("/activities/colors-quiz")}
        >
          Start Color Quiz
        </button>
      </div>
    </div>
  );
}
