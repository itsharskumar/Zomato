import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import UserLogin from '../pages/UserLogin'
import UserRegister from '../pages/UserRegister'
import FoodPartnerLogin from '../pages/FoodPartnerLogin'
import FoodPartnerRegister from '../pages/FoodPartnerRegister'
import Home from '../pages/general/Home'
import CreateFoodPartner from '../pages/food-partner/CreateFoodPartner'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
                <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
                <Route path="/food-partner/dashboard" element={<div>Food Partner Dashboard</div>} />
                <Route path="/foods" element={<div>All Foods</div>} />
                <Route path="/create-food" element={<CreateFoodPartner/>} />
                <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
        </Router>
    )
}

export default AppRoutes