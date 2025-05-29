import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;

    // console.log("Token found:", token);

    axios.get("http://localhost:3000/api/user/profile", {
      headers: {
        authorization: `${token}`,
      },
    })
      .then((res) => {

        setUser(res.data.user);
      })
      .catch((err) => {
        // console.error("Failed to load user:", err);
        setUser(null);
        Cookies.remove("token"); // Only removed when token is actually invalid
        window.location.href = "/login"; // Redirect to login page
      });
  }, []);

  const login = (token) => {
    Cookies.set("token", token, { expires: 7, secure: true, sameSite: "Strict" });
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("token");
    window.location.href = "/login"; // Redirect to login page
    
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
