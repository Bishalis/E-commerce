import React from "react";
import { Counter } from "./features/counter/Counter/Counter";
import "./App.css";
import Home from "./Pages/Home";
import { SignInPage } from "./Pages/SignInPage";
import { SignUpPage } from "./Pages/SignUpPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartPages } from "./Pages/CartPages";
import { Checkout } from "./Pages/CheckOut";
import { ProductDetailPage } from "./Pages/ProductDetailPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/cart" element={<CartPages/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/product-detail" element={<ProductDetailPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


