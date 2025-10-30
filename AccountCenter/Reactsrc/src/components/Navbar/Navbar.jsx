import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"; // isolated navbar CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">PatientApp</div>
      <ul className="navbar-menu">
        <li>
          <NavLink to="/add" activeclassname="active">
            Add
          </NavLink>
        </li>
        <li>
          <NavLink to="/display" activeclassname="active">
            Display
          </NavLink>
        </li>
        <li>
          <NavLink to="/update" activeclassname="active">
            Update
          </NavLink>
        </li>
        <li>
          <NavLink to="/delete" activeclassname="active">
            Delete
          </NavLink>
        </li>
        <li>
          <NavLink to="/search" activeclassname="active">
            Search
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
