import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/UserAuth.css";
import { signupUser } from "../../api/userapi";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(""); // ✅ For messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupUser(formData);
      setMessage("Signup successful! Redirecting to login...");

      setTimeout(() => {
        setMessage("");
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage(error.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Signup</h2>
        {message && <p className="auth-message">{message}</p>} {/* ✅ Display message */}
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
