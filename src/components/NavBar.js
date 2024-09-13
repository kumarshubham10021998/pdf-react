import React, { useState } from 'react';
import '../css/NavBar.css'; // Import custom CSS or use Bootstrap

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={toggleMenu}>
        <i className="fa fa-bars"></i> {/* You can use Font Awesome for icons */}
      </div>
      <ul className={isOpen ? 'nav-links active' : 'nav-links'}>
        <li><a href="/" className='h1 text-primary'>Resources</a></li>
        <li><a href="/">Home</a></li>
        <li><a href="/booklist">BookmarkList</a></li>
      </ul>
      <div className="buttons">
        <button className="subscribe-button">Subscribe Now</button>
        <button className="login-button">Login</button>
      </div>
    </nav>
  );
};

export default NavBar;
