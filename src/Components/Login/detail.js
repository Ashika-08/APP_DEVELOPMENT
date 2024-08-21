import React from 'react';
import { motion } from 'framer-motion';
import './DetailsPage.css';
import LoginPage from './login';

const DetailsPage = () => {
    const pageVariants = {
        initial: { opacity: 0, x: '-100vw' },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: '100vw' },
    };

    const pageTransition = {
        type: 'spring',
        stiffness: 50,
        duration: 0.8, // Adjust this for a smoother transition
    };

    return (
        <motion.div
            className="details-page-container"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
        >
           
            {/* Add more content for the details page here */}
        </motion.div>
    );
};

export default DetailsPage;
