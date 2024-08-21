import React, { useState } from 'react';
import axios from 'axios';
import './contact.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ContactForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const [submitMessage, setSubmitMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/faq/', formData); 
            setSubmitMessage('Message sent successfully! We will get back to you shortly via email.');
        } catch (error) {
            console.error('Error sending message:', error);
            setSubmitMessage('Error sending message');
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
        <motion.div className="contact-form-page-unique" initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}>
            <button className="login-back-button" onClick={() => navigate('/home')}>
                <img src="/pic/chess48.png" alt="Back" />
            </button>
            <h1 className="contact-form-title-unique">Contact Knight's Path</h1>
            <p className="contact-form-subtitle-unique">We're here to help and answer any question you might have. We look forward to hearing from you 😊</p>
            <form className="contact-form-unique" onSubmit={handleSubmit}>
                <div className="form-group-unique">
                    <label htmlFor="firstName" className="form-label-unique">User Name*</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="form-input-unique"
                    />
                </div>
                
                <div className="form-group-unique">
                    <label htmlFor="email" className="form-label-unique">Email*</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input-unique"
                    />
                </div>
                <div className="form-group-unique">
                    <label htmlFor="message" className="form-label-unique">Message*</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="form-textarea-unique"
                    />
                </div>
                <button type="submit" className="form-submit-button-unique">Send Message</button>
                {submitMessage && <p className="submit-message-unique">{submitMessage}</p>}
            </form>
        </motion.div>
    );
};

export default ContactForm;
