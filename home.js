import React from 'react';
import './home.css'; // Import the CSS specific to this component
import Carousel from './utilities/carousel'; // Import the Carousel component
import Navbar from './utilities/navbar'; // Import the Navbar component
import Benefits from './utilities/benefits';
import Courses from './utilities/courses';
import Pricing from './utilities/pricing';
import Footer from '../class/footer';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
    // Function to handle button click
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="home-page">
            <div className='carousel-container'>
                <div className='overlay'>
                    <Navbar /> {/* Use the Navbar component here */}
                </div>
                <Carousel /> {/* Add the Carousel component here */}
            </div>
            <div className='home_body'>
                <div className='home_container'>
                    <Benefits/>
                    <Courses/>
                    <Pricing/>
                </div>
            </div>
            
                <Footer/>
            
        </div>
    );
};

export default HomePage;