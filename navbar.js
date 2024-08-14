import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    const [classroomLink, setClassroomLink] = useState('/login');
    const [userRole, setUserRole] = useState(null);
    const [bgColor, setBgColor] = useState('transparent');
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);

            if (!parsedUser.id) {
                parsedUser.id = parsedUser._id || parsedUser.userId || 'ID not available';
            }
            const emailDomain = parsedUser.email.split('@')[1];
            const role = emailDomain === 'knights.in' ? 'Instructor' : 'Student';

            setUserRole(role);

            if (role === 'Instructor') {
                setClassroomLink('/ins');
            } else {
                setClassroomLink('/stu');
            }
        }

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setBgColor('#ADD8E6');
            } else {
                setBgColor('transparent');
            }
        };

        const handleResize = () => {
            setIsMinimized(window.innerWidth <= 768);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const handleCloseSidebar = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="navbar" style={{ backgroundColor: bgColor }}>
            <img src='/pic/logo.png' alt='logo' className="navbar-logo" />
            <div className="navbar-toggle" onClick={handleMenuToggle}>
                <span className={`bar ${isMinimized ? '' : 'blue-bar'}`}></span>
                <span className={`bar ${isMinimized ? '' : 'blue-bar'}`}></span>
                <span className={`bar ${isMinimized ? '' : 'blue-bar'}`}></span>
            </div>
            {isMinimized ? (
                <div className={`sidebar ${menuOpen ? 'active' : ''}`}>
                    <div className="close-btn" onClick={handleCloseSidebar}>&times;</div>
                    <ul className="sidebar-menu">
                        <li><Link to="/login" onClick={handleCloseSidebar}>Logout</Link></li>
                        <li><Link to="/pro" onClick={handleCloseSidebar}>Profile</Link></li>
                        <li><Link to={classroomLink} onClick={handleCloseSidebar}>Classroom</Link></li>
                        <li><Link to="/join" onClick={handleCloseSidebar}>Tournament</Link></li>
                        <li><Link to="/faq" onClick={handleCloseSidebar}>Support</Link></li>
                        <li><Link to="/about" onClick={handleCloseSidebar}>About</Link></li>
                        <li><Link to="/contactus" onClick={handleCloseSidebar}>Contact</Link></li>
                    </ul>
                </div>
            ) : (
                <ul className="navbar-menu">
                    <li><Link to="/login">Logout</Link></li>
                    <li><Link to="/pro">Profile</Link></li>
                    <li><Link to={classroomLink}>Classroom</Link></li>
                    <li><Link to="/join">Tournament</Link></li>
                    <li><Link to="/faq">Support</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contactus">Contact</Link></li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
