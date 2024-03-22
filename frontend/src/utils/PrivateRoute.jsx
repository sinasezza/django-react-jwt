import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import HomePage from "../pages/HomePage";

const PrivateRoute = ({children, ...rest}) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
