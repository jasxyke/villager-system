import React from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const LoginMiddleRoute = () => {
  const { loggedIn, isLoggedIn } = useAuthContext();
  console.log(isLoggedIn());

  if (!isLoggedIn()) {
    console.log("not logged in");
    return <Outlet />;
  }
  if (isLoggedIn()) {
    console.log("logged in");
    return <Navigate to={"/homepage"} />;
  }
};

export default LoginMiddleRoute;
