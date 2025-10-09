import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SingleColorPage.css";

// Full color images data (4 images per color)
const colorImages = {
   Red: [
   "https://media.istockphoto.com/id/834816218/photo/red-apple-fruit-with-half-and-green-leaf-isolated-on-white.webp?a=1&b=1&s=612x612&w=0&k=20&c=7MkXaN_Ulsf8IAG2hD6YnIxxGyLwcA00Cq0QMEZKjow=" ,
       "https://images.unsplash.com/photo-1640958904911-65668b264e26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVkJTIwdG9tYXRvfGVufDB8fDB8fHww" ,
       "https://images.unsplash.com/photo-1660809412526-e012e51e2c99?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlZCUyMHJvc2V8ZW58MHx8MHx8fDA%3D" ,
      "https://media.istockphoto.com/id/171152221/photo/floating-shiny-red-balloons-with-red-string.webp?a=1&b=1&s=612x612&w=0&k=20&c=tbOE47dRRFEnrWWhKKVHztrVLUzFPVqEQq7f-CfAD8o=" ,
  ],
  Blue: [
    "https://media.istockphoto.com/id/1325299873/photo/blue-sky-over-the-sea.webp?a=1&b=1&s=612x612&w=0&k=20&c=x-lp1qrccn5p-VWNSVVlc2ahi5v2frsYsyqxgLOWwTc=" ,
       "https://media.istockphoto.com/id/1130502890/photo/tropical-blue-butterfly-isolated-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=hS3N5ezThU7R0wqn7qqYx1ziXVz9Tr5lAO-NXrjRZu8=" ,
       "https://images.unsplash.com/photo-1698472505070-6d3b90afb530?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2hhbGV8ZW58MHx8MHx8fDA%3D" ,
      "https://media.istockphoto.com/id/2227502276/photo/abstract-colorful-blue-balls-chaotic-scatter-spheres-festive-party-wallpaper-3d-render.webp?a=1&b=1&s=612x612&w=0&k=20&c=o_n61onkSSz_jlf_9bk7EeyBeKhlt4Grglo5tiR4sO0=" ,
    
  ],
  Green: [
     "https://images.unsplash.com/photo-1473081556163-2a17de81fc97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGVhZnxlbnwwfHwwfHx8MA%3D%3D" ,
       "https://images.unsplash.com/photo-1515136462666-954e72276c7b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZyb2d8ZW58MHx8MHx8fDA%3D" ,
      "https://plus.unsplash.com/premium_photo-1673454201378-3867e051dca7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFycm90fGVufDB8fDB8fHww" ,
       "https://images.unsplash.com/photo-1533460004989-cef01064af7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3Jhc3N8ZW58MHx8MHx8fDA%3D" ,
    
  ],
  Yellow: [
    "https://media.istockphoto.com/id/1291262112/photo/banana.webp?a=1&b=1&s=612x612&w=0&k=20&c=KSmjx5R8Qk4mzzGw8tAP3CAPoSH_zdXD7sZYd1lBuD4=" ,
      "https://media.istockphoto.com/id/1198483230/photo/scissor-barber-hair-3d-illustration-on-yellow-background-minimal-idea-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=R0AbBOTn21jJhn46MXNWkugNTMaHQbi65UQruvnndWc=" ,
       "https://media.istockphoto.com/id/545255438/photo/smiling-rubber-duck.webp?a=1&b=1&s=612x612&w=0&k=20&c=30eVO-28j7M_xGgJx3AlA9WfsRcq2uraITHm_XXd4ms=" ,
       "https://images.unsplash.com/photo-1578652903016-b78571b87410?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvcm58ZW58MHx8MHx8fDA%3D" ,
    
  ],
  Purple: [
    "https://plus.unsplash.com/premium_photo-1661293854150-34b1a39aa46a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHVycGxlJTIwYnJpbmphbHxlbnwwfHwwfHx8MA%3D%3D" ,
       "https://images.unsplash.com/photo-1631299106224-aae61c217164?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHVycGxlJTIwZ3JhcGVzfGVufDB8fDB8fHww " ,
       "https://media.istockphoto.com/id/1844455523/photo/purple-candles-with-background-bokeh.webp?a=1&b=1&s=612x612&w=0&k=20&c=CXYj9i-SXieMVAC_mM7UfAcLrZxcY12KB9-Qh-uoSR0=" ,
       "https://plus.unsplash.com/premium_photo-1720525676483-eef667c388d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHB1cnBsZSUyMHRveXxlbnwwfHwwfHx8MA%3D%3D" ,
    
  ],
  Orange: [
    "https://plus.unsplash.com/premium_photo-1670512181061-e24282f7ee78?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b3JhbmdlfGVufDB8fDB8fHww" ,
       "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fycm90fGVufDB8fDB8fHww" ,
       "https://images.unsplash.com/photo-1692680919402-95fc56f99225?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHVtcGtpbnxlbnwwfHwwfHx8MA%3D%3D" ,
       "https://media.istockphoto.com/id/483119307/photo/3d-orange-sedan-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=V02cjMA6prpIszMHspC9zk2RqaivMBRcIVyyydPOMiQ=" ,
    
  ],
  Pink: [
    "https://images.unsplash.com/photo-1501686962565-1350ab98237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGluayUyMGZsb3dlcnxlbnwwfHwwfHx8MA%3D%3D" ,
      "https://images.unsplash.com/photo-1523992038393-d5ab874a077e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGluayUyMGNhbmR5fGVufDB8fDB8fHww" ,
      "https://images.unsplash.com/photo-1730373217385-54b68f7d817a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGluayUyMGRvbGx8ZW58MHx8MHx8fDA%3D" ,
       "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGluayUyMGljZSUyMGNyZWFtfGVufDB8fDB8fHww" ,
    ],

  
  Brown: [
    "https://plus.unsplash.com/premium_photo-1661849977833-c18cd1c7e295?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVhcnxlbnwwfHwwfHx8MA%3D%3D" ,
       "https://images.unsplash.com/photo-1623660053975-cf75a8be0908?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hvY29sYXRlfGVufDB8fDB8fHww" ,
       "https://plus.unsplash.com/premium_photo-1675040830227-9f18e88fd1f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29jb251dHxlbnwwfHwwfHx8MA%3D%3D" ,
       "https://5.imimg.com/data5/CW/EM/MY-65385261/clay-pot-500x500.jpg"
  ],
  Black: [
     "https://media.istockphoto.com/id/1068517448/photo/american-black-crow.webp?a=1&b=1&s=612x612&w=0&k=20&c=YzomHUHMOhBLya0odYmtM4YKOGJhFSRXdnO_YqLqMqg=" ,
       "https://media.istockphoto.com/id/184967432/photo/black-fedora-hat-isolated-on-white.webp?a=1&b=1&s=612x612&w=0&k=20&c=weQhjrXc843FXqOPqfVUh3Q4VtoE_YJ2eYCGLOwFnRA=" ,
       "https://images.unsplash.com/photo-1622560481979-f5b0174242a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxhY2slMjBiYWd8ZW58MHx8MHx8fDA%3D" ,
       "https://media.istockphoto.com/id/1429028833/photo/black-umbrella-isolated.webp?a=1&b=1&s=612x612&w=0&k=20&c=XP9aOV3ScNwaZif9w_EPMwP2Qrt_bHiBrvhDiAcPyEA=" ,
  ],
  White: [
    "https://plus.unsplash.com/premium_photo-1694481100261-ab16523c4093?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1pbGt8ZW58MHx8MHx8fDA%3D" ,
       "https://images.unsplash.com/photo-1607690424560-35d967d6ad7c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWdnfGVufDB8fDB8fHww" ,
       "https://plus.unsplash.com/premium_photo-1663090593977-9923cc536f3b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c25vd3xlbnwwfHwwfHx8MA%3D%3D" ,
       "https://images.unsplash.com/photo-1616431101491-554c0932ea40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y290dG9ufGVufDB8fDB8fHww" ,
    
  ]
};

const colors = Object.keys(colorImages);

const SingleColorPage = () => {
  const { color } = useParams();
  const navigate = useNavigate();

  const initialIndex = colors.indexOf(color);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const currentColor = colors[currentIndex];
  const currentImages = colorImages[currentColor];

  // Speak color name
  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(currentColor);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  }, [currentColor]);

  const handleNext = () => {
    if (currentIndex < colors.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="single-color-page">
      <button className="back-btn" onClick={() => navigate("/colors")}>
        Back to Colors
      </button>

      <h2>{currentColor}</h2>

      <div className="color-images-grid">
        {currentImages.map((imgUrl, idx) => (
          <img
            key={idx}
            src={imgUrl}
            alt={`${currentColor}-${idx}`}
            className="color-image"
            onClick={() => {
              const utterance = new SpeechSynthesisUtterance(currentColor);
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
          disabled={currentIndex === colors.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SingleColorPage;
