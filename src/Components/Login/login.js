import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import './login.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ email: '', password: '', general: '' });
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        setIsAuthenticated(!!token);
    }, []);

    const validateForm = () => {
        let validationErrors = {};
        let isValid = true;

        if (!email.trim()) {
            isValid = false;
            validationErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            isValid = false;
            validationErrors.email = "Email is not valid";
        }

        if (!password.trim()) {
            isValid = false;
            validationErrors.password = "Password is required";
        }

        setError(validationErrors);
        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (validateForm()) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/validate-credentials/', {
                    username: email,
                    password: password
                });
                console.log(response);
                if (response.status === 200) {
                    const { user, access_token } = response.data;
                    localStorage.setItem('access_token', access_token); // Store token in localStorage
                    localStorage.setItem('user', JSON.stringify(user)); // Store user details in localStorage
                    setIsAuthenticated(true);
                    navigate('/home'); // Redirect to home
                } else {
                    setError(prevError => ({ ...prevError, general: response.data.detail }));
                }
            } catch (err) {
                console.error('Error during login:', err);
                if (err.response && err.response.data.detail) {
                    setError(prevError => ({ ...prevError, general: err.response.data.detail }));
                } else {
                    setError(prevError => ({ ...prevError, general: 'Error logging in. Please try again later.' }));
                }
            }
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

    return (
        <motion.div
            className='login-body'
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
        >
            {/* {isAuthenticated && (
                <button className="login-back-button" onClick={() => navigate('/home')}>
                    <img src="/pic/chess48.png" alt="Back" />
                </button>
            )} */}
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    {error.general && <p className="login-error">{error.general}</p>}
                    <div className="login-form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error.email && <span className="error">{error.email}</span>}
                    </div>
                    <div className="login-form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error.password && <span className="error">{error.password}</span>}
                    </div>
                    <button type="submit" className="login-button">Login</button>
                    <div className="login-links">
                        <Link to="/signup">Don't have an account? Sign up</Link>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default LoginPage;
