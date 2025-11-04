import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../../api/userapi";
import "../../styles/UserAuth.css";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // ✅ For messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await postRequest("login", formData);
      setMessage(data.message || "Login successful! Redirecting...");
      localStorage.setItem("authToken", data.token || "true");

      // Redirect after 2 seconds
      setTimeout(() => {
        setMessage("");
        navigate("/display");
      }, 2000);
    } catch (error) {
      setMessage(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        {message && <p className="auth-message">{message}</p>} {/* ✅ Display message */}
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
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
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p>
          Don’t have an account? <a href="/signup">Register Now</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
