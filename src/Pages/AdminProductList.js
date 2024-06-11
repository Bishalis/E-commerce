import React from 'react'
import { NavBar } from '../features/Navbar/NavBar'
import AdminList from '../features/admin/components/AdminList'

export const AdminHome = () => {
  return (
    <NavBar>
        <AdminList/>
    </NavBar>
  )
}
