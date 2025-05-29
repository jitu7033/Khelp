

import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/CropDetails.css";
import { useCrops } from "../contexts/CropContext";
import CropGrid from "../components/CropGrid";

export default function CropDetails() {
  const navigate = useNavigate();
  const { cropName } = useParams();
  const { crops, loading } = useCrops();
  

  const targetId = cropName;
  const index = crops.findIndex(crop => crop.id == targetId);



  const [types, setTypes] = useState([]);
  const [crop, setCrop] = useState(null);

  useEffect(() => {
    // Match cropName to get cropId

    const matchedCrop = cropName;

    if (!matchedCrop) return;

    setCrop(matchedCrop);

    // Fetch crop types using the crop's ID
    axios
      .get(`http://localhost:3000/api/crops/get/type/${matchedCrop}`)
      .then((res) => {
        // console.log("Crop types fetched:", res.data.cropTypes);
        // console.log(res.data);
        setTypes(res.data.cropTypes || []);
      })
      .catch((err) => {
        console.error("Error fetching crop types :", err);
      });
  }, [cropName, crops]);

  if (!crop) return <p>Crop not found.</p>;


  const handleCardClick = (cropName) => {
    navigate(`/crop/${cropName}`);
  };

  return (
    <div className="crop-details">
      <h1>Find Your Favorite Crops </h1>
      <img src={crop.image} alt={crop.name} className="main-crop-image" />

      <h2>Types of {crops[index].name}</h2>
      <div className="quality-grid">
        {types.map((type) => (
          <div className="quality-card" key={type.id}>
            <strong>{type.type_name}</strong>
            <Link to={`/crop/${cropName}/${type.type_name.toLowerCase()}`}>
              <img src={type.image} alt={type.type_name} />
            </Link>
            <p>{type.content}</p>
          </div>
        ))}
      </div>

      <CropGrid crops={crops} onCardClick={handleCardClick} title="Explore Crops" />
    </div>
  );
}
