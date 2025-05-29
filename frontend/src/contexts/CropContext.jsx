

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CropContext = createContext();

export function useCrops() {
  return useContext(CropContext);
}

export function CropProvider({ children }) {
  const [crops, setCrops] = useState(() => {
    // Load from localStorage safely
    try {
      const stored = localStorage.getItem("crops");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCrops() {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/api/crops/get");
        if (Array.isArray(res.data.crops)) {
          setCrops(res.data.crops);
          localStorage.setItem("crops", JSON.stringify(res.data.crops));
        } else {
          setCrops([]);
          localStorage.removeItem("crops");
        }
      } catch (error) {
        console.error("Error fetching crops:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCrops();
  }, []);

  const value = {
    crops,
    loading,
  };

  return <CropContext.Provider value={value}>{children}</CropContext.Provider>;
}
