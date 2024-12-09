import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">!Name!</Link>
        <ul className="navbar-links">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
