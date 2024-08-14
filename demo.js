import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './demo.css';
import { motion } from 'framer-motion';

const Demo = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [countryCode, setCountryCode] = useState('IN');
    const [whatsappNumber, setWhatsappNumber] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name,
            country_code: countryCode,
            whatsapp_number: whatsappNumber
        };
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/contacts/', data);
            console.log('Data submitted successfully:', response.data);
            alert('Contact information submitted successfully.');
            // Handle successful submission (e.g., navigate to another page or show a success message)
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('Error submitting data. Please try again.');
            // Handle error (e.g., show an error message)
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
        <motion.div className="demo-page"  initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}>
            <div className="demo-container">
                <button className="signup_back_button" onClick={() => navigate('/home')}>
                    <img src="/pic/chess48.png" alt="Back" />
                </button>
                <div className="demo-left">
                    <h2>Welcome!</h2>
                    <div className="logo">
                        <img src="/pic/chess13.png" alt="Eight Times Eight Logo" />
                    </div>
                    <p>Knight's Path</p>
                    <p>Make the right move</p>
                </div>
                <div className="demo-right">
                    <h2>Enter Your WhatsApp Number</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <input 
                                type="text" 
                                placeholder="Enter Your Name" 
                                className="input-field"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <div className="input-group">
                                <select 
                                    className="country-code"
                                    value={countryCode}
                                    onChange={(e) => setCountryCode(e.target.value)}
                                >
                                    <option value="IN">IN (+91)</option>
                                    {/* Add more country codes as needed */}
                                </select>
                                <input 
                                    type="text" 
                                    placeholder="WhatsApp Number" 
                                    className="input-field"
                                    value={whatsappNumber}
                                    onChange={(e) => setWhatsappNumber(e.target.value)}
                                />
                            </div>
                            <button className="continue-button" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default Demo;
