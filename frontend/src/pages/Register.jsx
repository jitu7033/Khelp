import { useState } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function Register() {
  const [countryCode , setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [formData, setFormData] = useState({
    username:"",
    firstname:"",
    lastname:"",
    mobile: "",
    email: "",
    aadhar: "",
    address: "",
    pincode:"",
    district:"",
    state:"",
    country:"",
    password: "",
    confirmPassword : "",
  });


  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/user/register", formData);

      const data = await response.json();
      console.log(data);

      console.log(response);

      if(response.status == 409){
        alert('user already Exist');
        return;
      }


      if(!response.ok){
        alert('Registration Failed');
        return;
      }
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (

  
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          name="username"
          placeholder="User Name"
          value={formData.username}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
        />

        <select className="country-code-select" value={countryCode} onChange={e => setCountryCode(e.target.value)}>
          <option value="+1">+1 (USA)</option>
          <option value="+44">+44 (UK)</option>
          <option value="+91">+91 (India)</option>
          {/* add more as needed */}
        </select>
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          pattern="[0-9]{10}"
          maxLength={10}
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="aadhar"
          placeholder="Aadhar Card Number"
          value={formData.aadhar}
          pattern="[0-9]{12}"
          maxLength={12}
          required
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          required
          onChange={handleChange}
          rows={3}
        />
        <input 
          type="text"
          name="pincode"
          placeholder="Pin Code"
          value={formData.pincode}
          required
          onChange={handleChange}
        />
         <input
          type="text"
          name="district"
          placeholder="District"
          value={formData.district}
          required
          onChange={handleChange}
        />

         <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          required
          onChange={handleChange}
        />
         <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
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
          minLength={6}
        />
         <input
          type="password"
          name="confirmPassword"
          placeholder="confir Password"
          value={formData.confirmPassword}
          required
          onChange={handleChange}
          minLength={6}
        />
        
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
