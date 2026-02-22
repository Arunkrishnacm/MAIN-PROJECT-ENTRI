import React from 'react'
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import "../style/NavBar.css";



function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  const getNavText = () => {
    if (!user) return "My Orders";
    switch (user.role) {
      case "admin":
        return "Users";
      // case "technician":
      //   return "Services";
      case "user":
      default:
        return "My Orders";
    }
  }

  return (
    <div className='home-container'>
      <nav className="navbar">
        <h3>Home</h3>
        <div>
          <span onClick={() => navigate(getNavText() === "Users" ? "/users" : getNavText() === "My Orders" ? "/services" : "/assigned-services")}>{getNavText()}</span>
          <span onClick={handleLogout}>Logout</span>
        </div>
      </nav>
      <hr />
    </div>
  )
}

export default Navbar
