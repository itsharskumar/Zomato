import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";
import { useNavigate } from "react-router-dom";
const UserRegister = () => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password
        },
        { withCredentials: true }
      );

      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join us today</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="form-input"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/user/login" className="auth-link">
            Sign in
          </Link>
        </div>

        <div className="divider">OR</div>

        <div className="auth-footer">
          Want to become a partner?{" "}
          <Link to="/food-partner/register" className="auth-link">
            Partner Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
