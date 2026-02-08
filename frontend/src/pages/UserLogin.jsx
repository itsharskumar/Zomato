import React from 'react'
import { Link } from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/auth.css'

const UserLogin = () => {
const navigate=useNavigate();
    const [formData,setFormData]=useState({
        email:"",
        password:""
    })

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post("http://localhost:3000/api/auth/user/login",{
                email:formData.email,
                password:formData.password
            },{withCredentials:true})
            console.log(res.data)
            navigate("/")

        }catch(error){
            console.error(error.response?.data || error.message);
        }
    }
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" >Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={formData.email}
              onChange={(e)=>setFormData({...formData,email:e.target.value})}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={formData.password}
              onChange={(e)=>setFormData({...formData,password:e.target.value})}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="submit-button">
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{' '}
          <Link to="/user/register" className="auth-link">
            Sign up
          </Link>
        </div>

        <div className="divider">OR</div>

        <div className="auth-footer">
          Are you a food partner?{' '}
          <Link to="/food-partner/login" className="auth-link">
            Partner Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
