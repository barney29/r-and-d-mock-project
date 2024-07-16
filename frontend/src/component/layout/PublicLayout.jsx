import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PublicNavBar from "../nav/PublicNavBar";

const PublicLayout = () => {
  const auth = false;

  if (auth) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <PublicNavBar />
      <Outlet />
    </>
  );
};

export default PublicLayout;
