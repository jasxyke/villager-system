import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuthContext();

  if (!user) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role_type)) {
    // Redirect to a "Not Authorized" page or homepage if role is not allowed
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default PrivateRoute;
