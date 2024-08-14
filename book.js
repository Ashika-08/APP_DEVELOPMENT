import React from 'react';
import './book.css';
import { useNavigate } from 'react-router-dom';

const BookingComponent = () => {
    const navigate = useNavigate();
    const handleDetailsClick = () => {
        navigate('/demo');
    };
    return (
        <div className="booking-container">
            <div className="booking-content">
                <h1 className="booking-title">Master the Game of Brilliance with the Best Chess Academy in India</h1>
                <button className="booking-button" onClick={handleDetailsClick}>Request Call Back</button>
            </div>
            <div className="booking-image">
                <img src="/pic/chess11.png" alt="Chess Piece Character" />
            </div>
        </div>
    );
};

export default BookingComponent;
