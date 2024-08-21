import React from 'react';
import './test.css';

const WhyChooseUs = () => {
    return (
        <div className="why-choose-us">
            <h2>Why Choose Knight's Path Chess Academy?</h2>
            <div className="why-choose-us-benefits">
                <div className="why-choose-us-benefit">
                    <img src="/pic/chess61.jpg" alt="Expert Coaches" />
                    <h3>Expert Coaches</h3>
                    <p>Learn from top-level coaches who have years of experience in the field, guiding you to mastery.</p>
                </div>
                <div className="why-choose-us-benefit">
                    <img src="/pic/chess62.jpg" alt="Thriving Community" />
                    <h3>Thriving Community</h3>
                    <p>Join a community of passionate chess players and enthusiasts, all working to improve and support each other.</p>
                </div>
                <div className="why-choose-us-benefit">
                    <img src="/pic/chess63.jpg" alt="Competitive Environment" />
                    <h3>Competitive Environment</h3>
                    <p>Participate in regular tournaments and competitions to test and refine your skills.</p>
                </div>
                <div className="why-choose-us-benefit">
                    <img src="/pic/chess64.jpg" alt="Flexible Learning" />
                    <h3>Flexible Learning</h3>
                    <p>Access a range of learning resources and options that fit your schedule and learning style.</p>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
