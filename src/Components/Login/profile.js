import './profile.css'; // Assuming you have a CSS file for custom styles
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showInput, setShowInput] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);

            // Ensure ID is set
            if (!parsedUser.id) {
                parsedUser.id = parsedUser._id || parsedUser.userId || 'ID not available';
            }
            setUser(parsedUser);
            // Determine the role based on email domain
            const emailDomain = parsedUser.email.split('@')[1];
            parsedUser.role = emailDomain === 'knights.in' ? 'Instructor' : 'Student';

            setUser(parsedUser);
        } else {
            navigate('/login'); // Redirect to login if no user data found
        }
    }, [navigate]);

    const handleAddDetails = () => {
        setShowInput(true);
    };

    const handleSavePhoneNumber = async () => {
        if (user && phoneNumber && user.id !== 'ID not available') {
            try {
                const updatedProfile = {
                    phone: phoneNumber
                };
                // Update user profile in the backend
                const response = await axios.put(`http://127.0.0.1:8000/api/update-profile-by-id/${user.user_id}/`, updatedProfile);
    
                if (response.status === 200) {
                    const updatedUser = { ...user, profile: response.data };
                    // Update local storage
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    setUser(updatedUser);
                    setUpdateMessage('Phone number updated successfully');
                    setShowInput(false);
                } else {
                    setUpdateMessage('Failed to update phone number');
                }
            } catch (error) {
                console.error('Error updating phone number:', error);
                setUpdateMessage('Error updating phone number');
            }
        } else {
            setUpdateMessage('User ID is invalid');
        }
    };

    const pageVariants = {
        initial: { opacity: 0, y: '100vh' },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: '-100vh' },
    };

    const pageTransition = {
        type: 'spring',
        stiffness: 50,
        duration: 0.8,
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <motion.div
            className="profile-page"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
        >
            <button className="login-back-button" onClick={() => navigate('/home')}>
                <img src="/pic/chess48.png" alt="Back" />
            </button>
            <div className="profile-container">
                <h2>Profile</h2>
                <div className="profile-details">
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                </div>
                
                {updateMessage && <p>{updateMessage}</p>}
                {user.role === 'Instructor' && (
                    <>
                        {/* <button className="admin-dashboard-button" onClick={() => navigate('/admin')}>Admin Dashboard</button> */}
                        <button className="admin-dashboard-button" onClick={() => navigate('/addcourses')}>Add Courses</button>
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default ProfilePage;
