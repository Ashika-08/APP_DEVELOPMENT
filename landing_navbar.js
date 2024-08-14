import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './landing _navbar.css';

const KpNavbar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <nav className="kp-navbar">
            <div className="kp-navbar-logo">
                <img src="/pic/logo.png" alt="Knight's Path Logo" />
            </div>
            <ul className={`kp-navbar-links ${menuOpen ? 'active' : ''}`}>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/contactus'>Contact</Link></li>
                <li><button className="kp-navbar-button" onClick={handleLoginClick}>Login</button></li>
            </ul>
            <div className="kp-menu-icon" onClick={toggleMenu}>
                ☰
            </div>
        </nav>
    );
};

export default KpNavbar;
