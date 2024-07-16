import React from "react";
import { NavLink } from "react-router-dom";

const PublicNavBar = () => {
  return (
    <div className="p-5 flex justify-between bg-lime-200">
      <p>Share Logo</p>
      <nav className="space-x-9">
        <NavLink>Home</NavLink>
        <NavLink>About</NavLink>
        <NavLink className="bg-green-300 pl-5 pr-5 pt-2 pb-2 rounded-lg text-white font-bold shadow">
          Expert
        </NavLink>
        <NavLink>Business</NavLink>
        <NavLink>Lerner</NavLink>
        <NavLink>Info</NavLink>
        <NavLink>Investor</NavLink>
        <NavLink>Contact</NavLink>
      </nav>
    </div>
  );
};

export default PublicNavBar;
