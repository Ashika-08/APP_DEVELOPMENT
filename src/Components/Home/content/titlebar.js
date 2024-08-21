import React from 'react';
import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './titlebar.css'; // Import CSS specific to the Navbar component

const TitleBar = () => {
    const [classroomLink, setClassroomLink] = useState('/login');
    const [userRole, setUserRole] = useState(null);
    const [bgColor, setBgColor] = useState('transparent');
    const [menuOpen, setMenuOpen] = useState(false);
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

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <nav className="titlebar">
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/pro">Profile</Link></li>
                <li><Link to={classroomLink}>Classroom</Link></li>
            </ul>
        </nav>
    );
};

export default TitleBar;