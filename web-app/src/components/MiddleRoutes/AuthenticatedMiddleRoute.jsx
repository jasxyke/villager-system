import React from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedMiddleRoute = () => {
  const { loggedIn, isLoggedIn } = useAuthContext();
  console.log(`logged in: ${loggedIn}`);

  if (!isLoggedIn()) {
    return <Navigate to={"/"} />;
  } else {
    return <Outlet />;
  }
};

export default AuthenticatedMiddleRoute;
