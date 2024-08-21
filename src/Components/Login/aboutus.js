import React from 'react';
import { motion } from 'framer-motion';
import './aboutus.css';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
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
            className="kp-about-page"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            
        >
            <button className="login-back-button" onClick={() => navigate('/home')}>
                <img src="/pic/chess48.png" alt="Back" />
            </button>
            <div className="kp-about-content">
                <h1 className="kp-about-title">About Knight's Path</h1>

                <p className="kp-about-subtitle">
                    Knight's Path is a chess portal dedicated to enthusiasts, players, and learners at all levels. Our mission is to provide a comprehensive platform where everyone can explore the strategic depth and beauty of chess.
                </p>

                <div className="kp-about-details">
                    <h2>Our Journey</h2>
                    <p>
                        Founded by a group of passionate chess players, Knight's Path started with the vision to create a community where chess lovers could connect, learn, and compete. Over the years, we have evolved into a full-fledged platform offering tutorials, tournaments, and a vibrant community space.
                    </p>

                    <h2>What We Offer</h2>
                    <ul>
                        <li><strong>Learning Resources:</strong> From beginners to advanced players, we provide a range of tutorials, articles, and video lessons to help you improve your game.</li>
                        <li><strong>Interactive Community:</strong> Engage with fellow chess enthusiasts, participate in discussions, and share your insights in our forums.</li>
                        <li><strong>Online Tournaments:</strong> Test your skills against players from around the world in our regularly held online tournaments.</li>
                        <li><strong>Chess News and Updates:</strong> Stay informed with the latest news, trends, and events in the world of chess.</li>
                    </ul>

                    <h2>Our Mission</h2>
                    <p>
                        At Knight's Path, our mission is to promote the game of chess and make it accessible to everyone. We believe in the power of chess to sharpen the mind, foster critical thinking, and bring people together. Whether you're a casual player or aiming to be a grandmaster, we're here to support you on your chess journey.
                    </p>

                    <h2>Join Us</h2>
                    <p>
                        Become a part of the Knight's Path community today. Sign up, explore our resources, and start your journey toward mastering the game of kings!
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default AboutUs;
