import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './landingpage.css';
import WhyChooseUs from './test';
import KpNavbar from './landing_navbar';
import Courses from '../Home/utilities/courses';
import Footer from '../class/footer';
import BookingComponent from './book';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate('/login');
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
            className="kp-landing-page"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
        >
            {/* Main Content */}
            <div className="kp-landing-content">
                <KpNavbar/>
                <h1 className="kp-landing-title">Welcome to Knight's Path</h1>
                <p className="kp-landing-subtitle">Your Journey Begins Here</p>

                <p className="kp-landing-description">
                    Step into a world where strategy meets skill, and every move counts. Knight's Path is your ultimate destination for mastering the timeless game of chess. Whether you're a seasoned grandmaster or a curious beginner, our portal offers something for everyone.
                </p>

                <p className="kp-landing-invitation">
                    Join a community of passionate players and embark on a journey to chess mastery. Every journey begins with a single move—make yours today.
                </p>

                <button className="kp-landing-button" onClick={handleDetailsClick}>
                    Get Started
                </button>
            </div>
            <WhyChooseUs />
            <BookingComponent/>
            
            <div className='kp-components'>
            <Footer/>
            </div>
            {/* Footer */}
        </motion.div>
    );
};

export default LandingPage;
