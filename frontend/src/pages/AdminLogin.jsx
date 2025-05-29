import { useState } from "react";
import "../styles/Login.css";
import { useAdmin } from "../contexts/AdminContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; // Capitalized for consistency

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/admin/login", formData);

      if (response.status === 200) {
        const token = response.data.token;

        // Save token in cookie
        Cookies.set("adminToken", token, { expires: 7, secure: true, sameSite: "Strict" });

        // Set admin in context
        login(token);
        // Redirect to admin dashboard
        window.location.href = "/";
      } else {
        alert("Invalid login response.");
      }
    } catch (err) {
      if (err.response?.status === 404) {
        alert("Admin not found");
      } else {
        alert(err.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          required
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        <Link style={{ marginTop: "10px", display: "block" }} to="/login">
          Login as User
        </Link>
      </form>
    </div>
  );
}
