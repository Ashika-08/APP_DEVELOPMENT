import React from 'react';
import './features.css';

const features = [
    {
        title: "Engaging Curriculum",
        description: "Our curriculum is designed by best in the industry– former India no 4 and commonwealth Silver Medallist Grand Master SL Narayanan ensuring an engaging and dynamic learning experience for students of all levels.",
        color: "#f44336" // Red
    },
    {
        title: "Flexible Learning",
        description: "We understand the diverse schedules of our students, offering flexible class timings to accommodate various time zones and commitments.",
        color: "#4caf50" // Green
    },
    {
        title: "Expert Instructors",
        description: "Our team comprises International Fide Rated Coaches who bring a wealth of knowledge and experience to the classroom.",
        color: "#2196f3" // Blue
    },
    {
        title: "Global Exposure",
        description: "Our group classes consist of students living in different parts of the world which provides each student an opportunity to learn more not just about chess but the world in general.",
        color: "#ff5722" // Orange
    }
];

const FeaturesSection = () => {
    return (
        <div className="features-section">
            {features.map((feature, index) => (
                <div key={index} className="feature-card" style={{ borderColor: feature.color }}>
                    <h3 style={{ color: feature.color }}>{feature.title}</h3>
                    <p>{feature.description}</p>
                </div>
            ))}
        </div>
    );
};

export default FeaturesSection;
