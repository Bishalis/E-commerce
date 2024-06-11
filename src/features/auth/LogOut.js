import React, { useEffect } from "react";
import { selectloggedInUser, signOutAsync } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const LogOut = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectloggedInUser);
  useEffect(() => {
    dispatch(signOutAsync());
  });
  return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
};
