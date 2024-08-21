// src/components/LaunchImage.js
import React from 'react';
import launchImage from '../../images/launch.png'; // Adjust the path as needed
import './launch.css'

const LaunchImage = () => {
  return (
    <div className='launch-image-container'>
      <img src={launchImage} alt="Launch" />
    </div>
  );
};

export default LaunchImage;
