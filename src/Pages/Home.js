import React from 'react'
import { NavBar } from '../features/Navbar/NavBar'
import ProductList from '../features/product-list/Components/ProductList'
function Home() {
  return (
    <div >
        <NavBar>
            <ProductList></ProductList>
        </NavBar>
      
    </div>
  )
}

export default Home
