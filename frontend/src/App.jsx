import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'
import UserDashboard from '../pages/auth/userDashbord'
import { useAuth } from '../context/AuthContext'
import AdminDashbord from '../pages/auth/AdminDashbord'
import CustomerBooking from '../pages/auth/CustomerBooking'
import TechnicianDashbord from '../pages/auth/TechnicianDashbord'
import UserServices from '../pages/auth/UserServices'
import UsersList from '../pages/auth/UsersList'

function App() {
  const { user } = useAuth()

  return (
    <>
      
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashbord />} />
          <Route path="/technician" element={<TechnicianDashbord />} />
          <Route path="/booking" element={<CustomerBooking />} />
          <Route path="/services" element={<UserServices />} />
          <Route path="/users" element={<UsersList />} />
        </Routes>
      
    </>
  )
}

export default App;