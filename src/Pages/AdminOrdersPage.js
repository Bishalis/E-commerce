import React from 'react'
import { NavBar } from '../features/Navbar/NavBar'
import AdminList from '../features/admin/components/AdminList'
import { AdminOrders } from '../features/admin/components/AdminOrders'

export const AdminOrdersPage = () => {
  return (
    <NavBar>
        <AdminOrders/>
    </NavBar>
  )
}
