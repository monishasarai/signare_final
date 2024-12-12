import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';
import { FaUserCircle } from 'react-icons/fa';

const Nav = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();  // Hook to handle page navigation

  // Simulating user data, this can be dynamic in a real app
  const user = {
    name: "John Doe",
    email: "john.doe@example.com"
  };

  const handleSignOut = () => {
    alert('Signed out successfully!');
    // Add your signout logic here (e.g., clearing auth tokens)

    // Redirect to MainPage after sign out
    navigate('/'); // Assuming '/' is the MainPage route
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="nav-logo">
          Signare
        </Link>
      </div>
      <div className="navbar-right">
        <div
          className="user-icon"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <FaUserCircle size={30} color="white" />
        </div>
        {showDropdown && (
          <div className="dropdown-menu">
            <p className="dropdown-item"><strong>User:</strong> {user.name}</p>
            <p className="dropdown-item"><strong>Email:</strong> {user.email}</p>
            <button className="dropdown-signout" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;