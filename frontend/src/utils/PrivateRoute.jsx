import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ children, isAuthenticated, ...rest }) =>
  isAuthenticated ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Navigate to="/login/" replace />
  );

export default PrivateRoute;
