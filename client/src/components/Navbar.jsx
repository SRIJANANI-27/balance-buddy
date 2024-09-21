import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ currentUser, logout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Get the navigate function from useNavigate

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout(); // Call the logout function passed as a prop
    navigate('/login'); // Redirect to the login page
  };

  return (
    <nav className="bg-slate-500 text-white p-3 flex items-center justify-between">
      {/* Logo and Brand Name */}
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold">
          Balance Buddy ⚖️
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="space-x-4 flex items-center">
        <Link to="/home" className="text-white hover:bg-slate-700 px-4 py-2 rounded">
          Home
        </Link>
        {!currentUser ? (
          <>
            <Link to="/login" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
              Login
            </Link>
            <Link to="/register" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
              Register
            </Link>
          </>
        ) : (
          <div className="relative">
            <button 
              onClick={toggleDropdown} 
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded flex items-center"
            >
              <span className="mr-2">Welcome, {currentUser.name}!</span>
              <svg 
                className={`w-4 h-4 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded"
                role="menu"
                aria-orientation="vertical"
              >
                <button 
                  onClick={handleLogout} 
                  className="block w-full px-4 py-2 text-left hover:bg-gray-200 rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
