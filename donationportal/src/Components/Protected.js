import React from "react";
import { Route, Redirect, Link } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if the token is present

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Link to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
