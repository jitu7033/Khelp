import { useState } from "react";
import "../styles/Login.css";
import { useUser } from "../contexts/UserContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import cookie from "js-cookie";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useUser();
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
      const response = await axios.post("http://localhost:3000/api/user/login", formData);

      const {token } = response.data;
      // Save token in cookie
      cookie.set("token", token);
      // Set user in context
      login(token);
      // Redirect to home page
      window.location.href = "/";
    } catch (err) {
      if (err.response?.status === 404) {
        alert("User not found");
      } else if (err.response?.status === 401) {
        alert("Incorrect password");
      } else {
        alert(err.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>User Login</h2>
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
        <Link style={{ margin: "7px" }} to="/admin-login">
          Login as Admin
        </Link>
        <Link style={{ margin: "7px" }} to="/register">
          I don't have an account
        </Link>
      </form>
    </div>
  );
}
