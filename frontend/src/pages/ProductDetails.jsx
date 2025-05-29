
import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import "../styles/ProductDetails.css";
import { useAdmin } from "../contexts/AdminContext";
import { UserProvider, useUser } from "../contexts/UserContext";
import { useCrops } from "../contexts/CropContext";
export default function ProductDetails() {
  const { cropName, qualityType } = useParams(); // cropName is used as crop_id
  const { admin } = useAdmin();
  const {user} = useUser();
  const {crops} = useCrops();

    const targetId = cropName;
    const index = crops.findIndex(crop => crop.id == targetId);

  const [priceEntry, setPriceEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ price: "", unit: "" });
  const [refresh, setRefresh] = useState(false); // used to trigger re-fetch

  // Fetch data
  useEffect(() => {
    const fetchPriceData = async () => {
      setLoading(true);
      try {
        const token = Cookies.get('adminToken');
        if (!token || !cropName || !qualityType) return;

        const response = await axios.get("http://localhost:3000/api/admin/get/prices/", {
          headers: {
            crop_id: cropName,
            crop_type: qualityType,
            authorization: token
          }
        });

        if (response.status === 200) {
          const prices = response.data.prices || [];
          setPriceEntry(prices[0] || null);
        }
      } catch (err) {
        console.error("Error fetching price data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPriceData();
  }, [cropName, qualityType, refresh]);

  // Delete price
  const handleDelete = async () => {
    try {
      const token = Cookies.get('adminToken');
      if (!priceEntry || !token) return;

      await axios.delete("http://localhost:3000/api/admin/delete/price", {
        headers: {
          price_id: priceEntry.id,
          authorization: token
        }
      });

      setPriceEntry(null);
      setRefresh(prev => !prev);
    } catch (err) {
      console.error("Failed to delete price:", err);
    }
  };

  // Show form
  const handleAdd = () => {
    setShowForm(true);
  };

  // Input change handler
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit new price
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("adminToken");
      if (!token || !cropName || !qualityType) return;

      const response = await axios.post(
        "http://localhost:3000/api/admin/add/price",
        {
          price: formData.price,
          unit: formData.unit,
          crop_type_id: cropName,
          crop_type: qualityType,
        },
        {
          headers: { authorization: token },
        }
      );

      if (response.status === 201) {
        setShowForm(false);
        setRefresh(prev => !prev); // refresh triggers re-fetch
        setFormData({ price: "", unit: "" });
        localStorage.setItem('priceUpdated', Date.now());
       
      }
    } catch (err) {
      console.error("Error submitting price:", err);
    }
  };

  return (
    <div className="product-details" style={{ padding: '2rem' }}>
      <h1>My {qualityType.toUpperCase()} Quality {crops[index].name} Price</h1>
      {loading ? (
        <p>Loading...</p>
      ) : priceEntry ? (
        <div className="grid">
          <div className="card">
            <p><strong>Name:</strong> {admin.firstname} {admin.lastname}</p>
            <p><strong>Price:</strong> ₹{priceEntry.price}</p>
            <p><strong>Unit:</strong> {priceEntry.unit}</p>
            <p><strong>Contact:</strong> {admin.mobile}</p>

            <div style={{ marginTop: "1rem" }}>
              <button className="primary" onClick={() => alert("Edit Price form/modal would open here.")}>
                Edit
              </button>
              <button className="danger" onClick={handleDelete} style={{ marginLeft: "1rem" }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : showForm ? (
        <form onSubmit={handleSubmit} className="add-price-form">
          <div>
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="Enter price"
            />
          </div>
          <div>
            <label htmlFor="unit">Unit</label>
            <input
              id="unit"
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              required
              placeholder="e.g., per kg"
            />
          </div>
          <div className="button-group">
            <button type="submit" className="primary" disabled={!formData.price || !formData.unit}>
              Submit
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="secondary">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          
          <p>No price set yet for this quality.</p>
          {(user || admin) ? (
            <button className="primary" onClick={handleAdd}>Add Price</button>
          ) : (
            <p>
              Please <Link to="/login">log in</Link> first.
            </p>
            
          )}
        </div>
      )}
    </div>
  );
}
