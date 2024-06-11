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
import {
  checkAuthAsync,
  selectUserChecked,
  selectloggedInUser,
} from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/Cart/CartSlice";
import PageNotFound from "./Pages/404";
import OrderSuccessPage from "./Pages/Order-successPage";
import UserOrderPage from "./Pages/UserOrderPage";
import UserProfilePage from "./Pages/UserProfilePage";
import { fetchloggedInUserAsync } from "./features/user/UserSlice";
import { LogOut } from "./features/auth/LogOut";
import ForgetPasswordPage from "./Pages/ForgetPasswordPage";
import ProtectedAdmin from "./features/auth/ProtectedAdmin";
import { AdminHome } from "./Pages/AdminProductList";
import { AdminDetails } from "./features/admin/components/AdminDetails";
import { ProductFormPage } from "./Pages/AdminProductFormPage";
import { AdminOrdersPage } from "./Pages/AdminOrdersPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import StripeCheckout from "./Pages/StripeCheckout";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectloggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchloggedInUserAsync());
    }
  }, [dispatch, user]);

  return (
    <div>
      <ToastContainer/>
      {userChecked && (
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
              path="/admin"
              element={
                <ProtectedAdmin>
                  <AdminHome />
                </ProtectedAdmin>
              }
            />

            <Route
              path="/admin/product-detail/:id"
              element={
                <ProtectedAdmin>
                  <AdminDetails />
                </ProtectedAdmin>
              }
            />

            <Route
              path="/admin/product-form"
              element={
                <ProtectedAdmin>
                  <ProductFormPage />
                </ProtectedAdmin>
              }
            />

            <Route
              path="/admin/orders"
              element={
                <ProtectedAdmin>
                  <AdminOrdersPage />
                </ProtectedAdmin>
              }
            />
            <Route
              path="/admin/product-form/edit/:id"
              element={
                <ProtectedAdmin>
                  <ProductFormPage />
                </ProtectedAdmin>
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

            <Route
              path="/my-orders"
              element={
                <Protected>
                  <UserOrderPage />
                </Protected>
              }
            />
            <Route
              path="/stripe-checkout"
              element={
                <Protected>
                  <StripeCheckout /> 
                </Protected>
              }
            />

            <Route path="/order-success/:id" element={<OrderSuccessPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/logout" element={<LogOut />} />

            <Route
              path="/forget-password"
              element={<ForgetPasswordPage></ForgetPasswordPage>}
            />
            <Route path="*" element={<PageNotFound></PageNotFound>} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
