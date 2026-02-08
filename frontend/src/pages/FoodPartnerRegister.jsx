import React from 'react'
import { Link } from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/auth.css'

const FoodPartnerRegister = () => {
    const navigate=useNavigate();
    const [formData,setFormData]=useState({
        name:"",
        contactName:"",
        email:"",
        phone:"",
        address:"",
        password:""
    })
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post("http://localhost:3000/api/auth/food-partner/register",{
                    name:formData.name,
                    contactName:formData.contactName,
                    email:formData.email,
                    phone:formData.phone,
                    address:formData.address,
                    password:formData.password
              },
            {withCredentials:true})
            console.log(res.data);
            navigate("/create-food");
        }catch(error){
            console.error(error.response?.data || error.message);
        }
    }
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Become a Partner</h1>
          <p className="auth-subtitle">Start sharing your culinary creations</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Business Name</label>
            <input
              type="text"
              id="name"
              className="form-input"
              value={formData.name}
              onChange={(e)=>setFormData({...formData,name:e.target.value})}
              placeholder="Enter your business name"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="contactName">Contact Name</label>
            <input
              type="text"
              id="contactName"
              className="form-input"
              value={formData.contactName}
                onChange={(e)=>setFormData({...formData,contactName:e.target.value})}
              placeholder="Enter contact person name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
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
            <label className="form-label" >Phone Number</label>
            <input
              type="tel"
              id="phone"
              className="form-input"
              value={formData.phone}
                onChange={(e)=>setFormData({...formData,phone:e.target.value})}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              className="form-input"
              value={formData.address}
                onChange={(e)=>setFormData({...formData,address:e.target.value})}
              placeholder="Enter your business address"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={formData.password}
                onChange={(e)=>setFormData({...formData,password:e.target.value})}
              placeholder="Create a password"
            />
          </div>

          <button type="submit" className="submit-button">
            Register as Partner
          </button>
        </form>

        <div className="auth-footer">
          Already a partner?{' '}
          <Link to="/food-partner/login" className="auth-link">
            Sign in
          </Link>
        </div>

        <div className="divider">OR</div>

        <div className="auth-footer">
          Just browsing?{' '}
          <Link to="/user/register" className="auth-link">
            User Signup
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FoodPartnerRegister
