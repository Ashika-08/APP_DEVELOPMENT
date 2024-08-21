import React from 'react';
import './intermediate.css'; // Import the CSS file for styling
import Pricing from '../utilities/pricing';
import TitleBar from './titlebar';
import FeaturesSection from './features';
import { motion } from 'framer-motion';

const Intermediate = () => {
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
    <motion.div className="intermediate-container"
    initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}>
      <div className='title_bar'><TitleBar/></div>
      <img src='/pic/Intermediate.png'></img>
      <FeaturesSection/>
      <div className='price_sec'>
      <Pricing/>
      </div>
    </motion.div>
  );
};

export default Intermediate;
