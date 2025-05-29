


import React from "react";
import "../styles/CropGrid.css";

export default function CropGrid({ crops, onCardClick, title = "All Type Crop" }) {
  if (!Array.isArray(crops) || crops.length === 0) {
    return <p>Reload the page one more Times .</p>;
  }

  return (
    <section className="section">
      <h2>{title}</h2>
      <div className="grid">
        {crops.map((crop, index) => (
          <div
            className="card"
            key={crop.id || index}
            onClick={() => onCardClick(crop.id)}
            style={{ cursor: "pointer" }}
          >
            {crop.image ? (
              <img src={crop.image} alt={crop.name} />
            ) : (
              <div className="placeholder-image">No image</div>
            )}
            <h3>{crop.name}</h3>
            <p>{crop.content || crop.contnent || ""}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


