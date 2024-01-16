import React from 'react'
import { NavBar } from '../features/counter/Navbar/NavBar'
import ProductList from '../features/counter/product-list/ProductList'
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
