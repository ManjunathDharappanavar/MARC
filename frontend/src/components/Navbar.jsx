import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

/**
 * Navbar Component
 * - Responsive navigation with hamburger menu for mobile
 * - Active route highlighting
 * - Smooth animations
 */
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu when a link is clicked
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  // Check if route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={handleNavClick}>
          <span className="logo-text">MARC</span>
        </Link>

        {/* Hamburger Menu Icon */}
        <div
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          role="button"
          tabIndex="0"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>

        {/* Navigation Menu */}
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/about"
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/login"
              className={`nav-link ${isActive('/login') ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/register"
              className={`nav-link ${isActive('/register') ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
