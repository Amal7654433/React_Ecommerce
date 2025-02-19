import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from '../admin/adminDashboard'
import AdminLogin from '../admin/adminLogin'
export const adminRoute = () => {
  return (
    <>
    <Routes>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>

  </>
  )
}
