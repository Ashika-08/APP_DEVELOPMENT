import React, { useState, useEffect } from 'react';
import './benefits.css';

const initialBenefits = [
    { icon: "/pic/dart.png", title: "Improved Focus" },
    { icon: "/pic/brain.png", title: "Boosts Memory" },
    { icon: "/pic/ps.png", title: "Problem Solving" },
    { icon: "/pic/time.png", title: "Time Management" },
    { icon: "/pic/creative.png", title: "Creative Thinking" },
    { icon: "/pic/ag.png", title: "Academic Growth" },
    { icon: "/pic/relationship.png", title: "Relationship Building" },
];

const Benefits = () => {
    const [benefits, setBenefits] = useState(initialBenefits);

    useEffect(() => {
        const scrollInterval = setInterval(() => {
            setBenefits(prevBenefits => {
                const newBenefits = [...prevBenefits];
                newBenefits.push(newBenefits.shift()); // Move the first element to the end
                return newBenefits;
            });
        }, 3000);

        return () => clearInterval(scrollInterval);
    }, []);

    return (
        <div className="benefits-container">
            <h2>Benefits of adopting chess as a hobby</h2>
            <div className="benefits-scroll">
                {benefits.map((benefit, index) => (
                    <div key={index} className="benefit-item">
                        <img src={benefit.icon} alt={benefit.title} />
                        <h3>{benefit.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Benefits;
