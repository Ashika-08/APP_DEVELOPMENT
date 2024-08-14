import React from 'react';
import { motion } from 'framer-motion';
import './contactus.css';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
    const navigate = useNavigate();
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
            className="kp-contact-page"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
        >
            <button className="login-back-button" onClick={() => navigate('/home')}>
                <img src="/pic/chess48.png" alt="Back" />
            </button>
            <div className="kp-contact-content">
                <h1 className="kp-contact-title">Contact Us</h1>

                <p className="kp-contact-subtitle">
                    We would love to hear from you! Whether you have a question about our platform, need assistance, or just want to share your feedback, feel free to reach out to us through any of the following channels:
                </p>

                <div className="kp-contact-details">
                    <p><strong>Phone:</strong> <a href="tel:+8754885500">8754885500</a></p>
                    <p><strong>Email:</strong> <a href="mailto:admin.knigthspath.in">admin.knigthspath.in</a></p>
                    <p><strong>Instagram:</strong> <a href="https://instagram.com/knights_path" target="_blank" rel="noopener noreferrer">@knights_path</a></p>
                    <p><strong>Twitter:</strong> <a href="https://twitter.com/knigthspath_officials" target="_blank" rel="noopener noreferrer">@knigthspath_officials</a></p>
                </div>
            </div>
        </motion.div>
    );
};

export default ContactUs;
