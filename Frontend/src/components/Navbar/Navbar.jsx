import React , { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userProfile from '../../assets/user-profile.webp';
import hamburgerIcon from '../../assets/hamburger-icon.webp';
import './Navbar.css';

const Navbar = () => {

  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [hamburgerMenu, setHamburgerMenu] = useState(false);

  const handleHumbergerIconClick = () => {
    setShowMenu(false); 
    setHamburgerMenu(!hamburgerMenu);
    // console.log("Hamburger Icon Clicked");
  }

  const handleLogout= () => {
      localStorage.removeItem("user");
      navigate(`/login`);
  }

  const handleImageClick = () =>{
    setHamburgerMenu(false); 
    setShowMenu(!showMenu);
    // console.log("Clicked");
  }

  const closeMenus = () => {
    setHamburgerMenu(false);
    setShowMenu(false);
  }
  return (
    <nav className="navbar">
      <Link to="/" className="title">BookNest</Link>

      {/* Navigation Links */}
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/all-books">Books</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>


      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search books..."
          className="search-input"
        />
        <button className="search-button">Search</button>
      </div>
      {!user?
        <div className="auth-links">
          <Link to="/login" className="login-link">Login</Link>
          <Link to="/register" className="signup-link">Sign Up</Link>
        </div>
      :
        <div className='profile-links'>
          <div className='profile-section'>
              <img src={userProfile} className='user-profile' onClick={handleImageClick}/>
              {showMenu &&
              <div className='profile-menu'>
                <span>Welcome, {user.username}</span>
                <Link to= "/favorite" onClick={closeMenus}>Favorite</Link>
                <Link to= "/cart" onClick={closeMenus}>Cart</Link>
                <Link to= "/history" onClick={closeMenus}>Order History</Link>
                <button onClick={handleLogout} className='logout-link'>Logout</button>
              </div>
              }
          </div>
          <div className='hamburger-menu'>
                <img src={hamburgerIcon} onClick={handleHumbergerIconClick} alt="Menu" />
                {hamburgerMenu &&
                <div className='hamburger-links'>
                  <Link to="/" onClick={closeMenus}>Home</Link>
                  <Link to="/about" onClick={closeMenus}>About</Link>
                  <Link to="/all-books" onClick={closeMenus}>Books</Link>
                  <Link to="/contact" onClick={closeMenus}>Contact</Link>
                </div>
                }
          </div>
        </div>
    } 
    </nav>
  );
};

export default Navbar;
