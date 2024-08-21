import React, { useState } from 'react';
import axios from 'axios';
import './addcourses.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AddCoursesPage = () => {
    const navigate = useNavigate();
    const [course, setCourse] = useState({
        icon: '',
        title: '',
        age: '',
        description: '',
        path: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse({ ...course, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting course:', course);
            const response = await axios.post('http://127.0.0.1:8000/api/courses/', course);
            console.log('Response:', response);
            if (response.status === 201 || response.status === 200) {  // Check for both 201 (Created) and 200 (OK) status codes
                setMessage('Course added successfully');
                setCourse({
                    icon: '',
                    title: '',
                    age: '',
                    description: '',
                    path: ''
                });
            } else {
                setMessage('Failed to add course');
            }
        } catch (error) {
            console.error('Error adding course:', error.response ? error.response.data : error.message);
            setMessage('Error adding course. Please check console for details.');
        }
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
        <motion.div className='add-courses-body' initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}>
            <button className="login-back-button" onClick={() => navigate('/home')}>
                <img src="/pic/chess48.png" alt="Back" />
            </button>
            <div className="add-courses-main">
                <div className="add-courses-page">
                    <h2 className="add-courses-title">Add New Course</h2>
                    <form className="add-courses-form" onSubmit={handleSubmit}>
                        <label className="form-label">
                            Title:
                            <input
                                className="form-input"
                                type="text"
                                name="title"
                                value={course.title}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label className="form-label">
                            Age Range:
                            <input
                                className="form-input"
                                type="text"
                                name="age"
                                value={course.age}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label className="form-label">
                            Description:
                            <textarea
                                className="form-textarea"
                                name="description"
                                value={course.description}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label className="form-label">
                            Path:
                            <input
                                className="form-input"
                                type="text"
                                name="path"
                                value={course.path}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label className="form-label">
                            Icon URL:
                            <input
                                className="form-input"
                                type="text"
                                name="icon"
                                value={course.icon}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <button className="submit-button" type="submit">Add Course</button>
                    </form>
                    {message && <p className="response-message">{message}</p>}
                </div>
            </div>
        </motion.div>
    );
};

export default AddCoursesPage;
