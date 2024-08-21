import React, { useState, useEffect } from "react";
import axios from "axios";
import './courseregistation.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CourseRegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    pricing: "",
    interests: [],
    agreeToTerms: false,
  });

  const [courses, setCourses] = useState([]);
  const [pricingOptions, setPricingOptions] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/courses/');
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const fetchPricingOptions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/pricing/');
        setPricingOptions(response.data);
      } catch (error) {
        console.error("Error fetching pricing options:", error);
      }
    };

    fetchCourses();
    fetchPricingOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name === "agreeToTerms") {
        setFormData({ ...formData, [name]: checked });
      } else {
        setFormData((prevData) => {
          if (checked) {
            return { ...prevData, interests: [...prevData.interests, value] };
          } else {
            return {
              ...prevData,
              interests: prevData.interests.filter((interest) => interest !== value),
            };
          }
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/cregister/', formData);
      alert('Registration successful, Will get back to you shortly via mail or phone along with payment details  ' );
      // You can redirect or show a success message here
    } catch (error) {
      console.error('Error during registration:', error);
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
    <motion.div className="course-body" initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    transition={pageTransition}>
      <button className="login-back-button" onClick={() => navigate('/home')}>
                    <img src="/pic/chess48.png" alt="Back" />
                </button>
      <div className="course-registration-container">
        <form className="course-registration-form" onSubmit={handleSubmit}>
          <h2 className="course-registration-title">Course Registration Form</h2>
          <div className="course-registration-form-group">
            <label className="course-registration-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="course-registration-input"
            />
          </div>
          <div className="course-registration-form-group">
            <label className="course-registration-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="course-registration-input"
            />
          </div>
          <div className="course-registration-form-group">
            <label className="course-registration-label">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="course-registration-input"
            />
          </div>
          <div className="course-registration-form-group">
            <label className="course-registration-label">Course</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="course-registration-select"
            >
              <option value="">Select the course you want to register for</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
          <div className="course-registration-form-group">
            <label className="course-registration-label">Pricing</label>
            <select
              name="pricing"
              value={formData.pricing}
              onChange={handleChange}
              className="course-registration-select"
            >
              <option value="">Select a pricing option</option>
              {pricingOptions.map((pricing) => (
                <option key={pricing.id} value={pricing.id}>
                  {pricing.plan_name} - {pricing.plan_duration} - ${pricing.discounted_price}
                </option>
              ))}
            </select>
          </div>
          
          <div className="course-registration-form-group">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="course-registration-checkbox"
            />
            <label>I agree to the terms and conditions.</label>
          </div>
          <button type="submit" className="course-registration-submit-btn">
            Submit
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default CourseRegistrationForm;
