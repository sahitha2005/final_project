import React from "react";
import { useNavigate } from "react-router-dom";
import "./ColorsPage.css";

const animalsData = [
  { name: "Dog", url: "https://t4.ftcdn.net/jpg/15/18/01/21/360_F_1518012188_7v0bweee6Ivy7XJvMZyMyjmaJNzN30BK.jpg" },
  { name: "Cat", url: "https://png.pngtree.com/png-clipart/20231002/original/pngtree-cute-cartoon-cat-png-image_13060428.png" },
  { name: "Goat", url: "https://png.pngtree.com/png-clipart/20250104/original/pngtree-goat-cartoon-image-png-image_18720388.png" },
  { name: "Sheep", url: "https://img.freepik.com/free-vector/hand-drawn-cartoon-sheep-illustration_23-2150375976.jpg?semt=ais_hybrid&w=740&q=80" },
  { name: "Lion", url: "https://t4.ftcdn.net/jpg/01/18/93/99/360_F_118939938_QJEfcc07LQTjaGGvhqlCZtdKV7RyojR5.jpg" },
  { name: "Elephant", url: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTEyL3Jhd3BpeGVsb2ZmaWNlMV9zdHlsZV9zaW1wbGVfZmxhdF92ZWN0b3JfaWxsdXN0cmF0aW9uX2xvd19kZXRhaV82MTFhM2NhYy1iY2QzLTQwYzctYmEyZi1jMWVlZDFkYTQzMzUtbTRjZTd5M3YucG5n.png" },
  { name: "Pig", url: "https://img.freepik.com/free-vector/cute-pig-sitting-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-flat_138676-7818.jpg?semt=ais_hybrid&w=740&q=80" },
  { name: "Bear", url: "https://static.vecteezy.com/system/resources/previews/020/273/547/non_2x/cute-cartoon-bear-illustration-free-vector.jpg" },
  { name: "Tiger", url: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2pvYjY4Ni0yNzktdi5qcGc.jpg" },
  { name: "Wolf", url: "https://www.shutterstock.com/image-vector/vector-cartoon-cute-baby-wolf-600nw-2428207797.jpg" },
];

export default function AnimalsPage() {
  const navigate = useNavigate();

  return (
    <div className="colors-page-container">

      {/* Top Center Back Button */}
      <div className="button-top-center">
        <button className="back-btn" onClick={() => navigate("/topics")}>
          Back to Topics
        </button>
      </div>

      {/* Animals Grid */}
      <div className="colors-grid">
        {animalsData.map((animal) => (
          <div
            key={animal.name}
            className="color-card"
            onClick={() => navigate(`/animals/${animal.name}`)}
          >
            <img src={animal.url} alt={animal.name} />
            <p className="color-name">{animal.name}</p>
          </div>
        ))}
      </div>

      {/* Bottom Center Start Quiz Button */}
      <div className="button-bottom-center">
        {/* Add quiz button later */}
      </div>
    </div>
  );
}
