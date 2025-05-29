import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/UserProductDetails.css"; // Ensure you have this CSS file for styling
import Cookies from "js-cookie"; // Ensure you have js-cookie installed
import { useCrops } from "../contexts/CropContext";

export default function UserProductDetails() {
 const { cropName, qualityType } = useParams();
  const [prices, setPrices] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const token = Cookies.get("token");
  const {crops} = useCrops();

  const targetId = cropName;

  const index = crops.findIndex(crop => crop.id == targetId);


  // console.log("Crop ID:", cropName);
  // console.log("Crop Type:", qualityType);
  

  useEffect(() => {
    const fetchPrices = async () => {
      try {
         const res = await axios.get("http://localhost:3000/api/user/get/price/", {
          headers: {
            crop_id: cropName,
            crop_type: qualityType,
            authorization: token
          }
          });
          console.log(res.data.prices);
        setPrices(res.data.prices || []);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };
    
    fetchPrices();
  }, [cropName, qualityType,token]);

  const filteredAndSorted = prices
    .filter(p =>
      `${p.district} ${p.state}`.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  return (
    <div className="user-product-details">
      <h2>{qualityType.toLocaleUpperCase()} Quality Prices for Crop Name: {crops[index].name}</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by location..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
        >
          <option value="asc">💰 Low to High</option>
          <option value="desc">💰 High to Low</option>
        </select>
      </div>

      <div className="price-grid">
        {filteredAndSorted.length > 0 ? (
          filteredAndSorted.map((p, idx) => (
            <div className="price-card" key={idx}>
              <img
                src={p.image}
                alt={`${p.firstname} ${p.lastname}`}
                className="profile-img"
              />
              <h3>{p.firstname} {p.lastname}</h3>
              <p><strong>Price:</strong> ₹{p.price} / {p.unit}</p>
              <p><strong>Location:</strong> {p.district}, {p.state}</p>
              <p><strong>Contact:</strong> {p.mobile}</p>
              <button>📞 Contact</button>
            </div>
          ))
        ) : (
          <p className="no-results">No prices available for this crop and type.</p>
        )}
      </div>
    </div>
  );
}
