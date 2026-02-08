import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.css'

const FoodPartnerLogin = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Partner Login</h1>
          <p className="auth-subtitle">Access your partner dashboard</p>
        </div>

        <form className="auth-form">
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="submit-button">
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          Don't have a partner account?{' '}
          <Link to="/food-partner/register" className="auth-link">
            Register as Partner
          </Link>
        </div>

        <div className="divider">OR</div>

        <div className="auth-footer">
          Regular user?{' '}
          <Link to="/user/login" className="auth-link">
            User Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FoodPartnerLogin
