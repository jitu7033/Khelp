// src/contexts/AdminContext.js

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const AdminContext = createContext();

export function useAdmin() {
  return useContext(AdminContext);
}

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);

 useEffect(() => {
    const token = Cookies.get("adminToken");
    if (!token) return;

    // console.log("Token found:", token);

    axios.get("http://localhost:3000/api/admin/profile", {
      headers: {
        authorization: `${token}`,
      },
    })
      .then((res) => {
        setAdmin(res.data.admin);
      })
      .catch((err) => {
        console.error("Failed to load user:", err);
        setAdmin(null);
        Cookies.remove("adminToken"); // Only removed when token is actually invalid
      });
  }, []);


  const login = (token) => {
     Cookies.set("adminToken", token, { expires: 7, secure: true, sameSite: "Strict" });
  };
  const logout = () => {
    setAdmin(null);
    Cookies.remove("adminToken");
    window.location.href = "/admin-login"; // Redirect to admin login page
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}
