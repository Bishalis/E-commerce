import React, { useEffect } from "react";
import "./App.css";
import Home from "./Pages/Home";
import { SignInPage } from "./Pages/SignInPage";
import { SignUpPage } from "./Pages/SignUpPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartPages } from "./Pages/CartPages";
import { Checkout } from "./Pages/CheckOut";
import { ProductDetailPage } from "./Pages/ProductDetailPage";
import Protected from "./features/auth/Protected";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/Cart/CartSlice";
import PageNotFound from "./Pages/404";
import OrderSuccessPage from "./Pages/Order-successPage";
import { UserOrders } from "./features/user/components/UserOrder";
import UserOrderPage from "./Pages/UserOrderPage";
import { UserProfile } from "./features/user/components/UserProfile";
import UserProfilePage from "./Pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/UserSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  }, [dispatch, user]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/cart"
            element={
              <Protected>
                <CartPages />
              </Protected>
            }
          />
          <Route
            path="/checkout"
            element={
              <Protected>
                <Checkout />
              </Protected>
            }
          />
          <Route
            path="/product-detail/:id"
            element={
              <Protected>
                <ProductDetailPage />
              </Protected>
            }
          />

          <Route path="/order-success/:id" element={<OrderSuccessPage />} />

          <Route path="/order" element={<UserOrderPage/>} />
          <Route path="/profile" element={<UserProfilePage/>} />


          <Route path="*" element={<PageNotFound></PageNotFound>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
