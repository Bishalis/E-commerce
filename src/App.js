import React from "react";
import { Counter } from "./features/counter/Counter/Counter";
import "./App.css";
import Home from "./Pages/Home";
import { SignInPage } from "./Pages/SignInPage";
import { SignUpPage } from "./Pages/SignUpPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartPages } from "./Pages/CartPages";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/cart" element={<CartPages/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
