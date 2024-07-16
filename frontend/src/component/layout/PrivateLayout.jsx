import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PrivateNavBar from "../nav/PrivateNavBar";

const PrivateLayout = () => {
  const auth = false;

  if (!auth) {
    return <Navigate to="/auth" />;
  }
  return (
    <>
      <PrivateNavBar />
      <Outlet />
    </>
  );
};

export default PrivateLayout;
