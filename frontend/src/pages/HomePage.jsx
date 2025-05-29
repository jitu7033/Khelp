import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import CropGrid from "../components/CropGrid";
import "./../styles/HomePage.css";
import { useCrops } from "../contexts/CropContext";


const HomePage = () => {
  const navigate = useNavigate();
  const {crops, loading} = useCrops();
  


    const handleCardClick = (cropName) => {
    // Navigate to /crop/<cropName>
    navigate(`/crop/${cropName}`);
  };

  return (
    <div className="homepage">
        <header className="hero">
          <h1>Find Your Favorite Crop</h1>
          <img src="https://i.pinimg.com/736x/98/98/58/9898587b451d4bdeeeb42e8832550587.jpg" alt="Hero Crop" />
        </header>

        {/* here is call component from the crop grid */}
        <CropGrid crops={crops} onCardClick={handleCardClick} title="Explore Crops" />

        <section className="section features">
         <h2>Why Choose Our Crop Marketplace?</h2>
          <div className="feature-layout">
            <div className="text">
              <div>
               <h4>Easy Crop Listing & Discovery</h4>
                <p>
                  Farmers can easily list their crops with images, price, and location. Buyers can filter by crop quality and connect with sellers quickly.
                </p>
              </div>
              <div>
                <h4>Real-Time Price Comparison</h4>
                <p>
                  Instantly compare prices for each crop type and quality from different sellers. Get the best deals based on your location and needs.
                </p>
              </div>
              <div>
                <h4>Secure & Verified Access</h4>
                <p>
                  We ensure every user is verified via mobile or Google login. Your data is safe, and transactions are reliable.
                </p>
              </div>

              {/* <div className="buttons">
                <button className="primary">Button</button>
                <button className="secondary">Secondary button</button>
              </div> */}
            </div>

            <img
              src="https://media.istockphoto.com/id/1318886610/photo/indian-farmer-taking-photo-with-his-smartphone-of-green-paddy-or-wheat-plant-in-green.jpg?s=612x612&w=0&k=20&c=N3a2H2L9RihuIJcDxA4-YtqAYhIoh1oGLCe3EFtsxcg="
              alt="Feature"
            />
          </div>
        </section>


      
    </div>
  );
};

export default HomePage;
