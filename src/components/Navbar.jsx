import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Start
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/projects" className="navbar-link">
            Projects
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
