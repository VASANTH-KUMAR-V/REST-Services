import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">PatientApp</div>
      {/* <ul className="navbar-menu">
        <li><NavLink to="/add" activeclassname="active">Add</NavLink></li>
        <li><NavLink to="/display" activeclassname="active">Display</NavLink></li>
        <li><NavLink to="/update" activeclassname="active">Update</NavLink></li>
        <li><NavLink to="/remove" activeclassname="active">Delete</NavLink></li>
        <li><NavLink to="/search" activeclassname="active">Search</NavLink></li>
      </ul> */}
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
