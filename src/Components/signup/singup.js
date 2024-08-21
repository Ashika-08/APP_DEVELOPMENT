import { validatePassword, validateConfirmPassword } from './validate';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Alert from '@mui/material/Alert';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css';
import { motion } from 'framer-motion';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchPwd, setMatchPwd] = useState('');
  const [matchFocus, setMatchFocus] = useState(false);
  const [validMatch, setValidMatch] = useState(true);
  const [alert, setAlert] = useState({ message: '', severity: '' });

  const passwordValidationMsg = validatePassword(formData.password);
  const confirmPwdValidationMsg = validateConfirmPassword(formData.password, matchPwd);
  const navigate = useNavigate();

  const validateMatch = () => {
    if (!matchPwd) {
      setValidMatch(true);
    } else if (formData.password === matchPwd) {
      setValidMatch(true);
    } else {
      setValidMatch(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });
      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      setAlert({
        message: 'User registered successfully.',
        severity: 'success'
      });
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Error registering user. Please try again.';
      setAlert({
        message: errorMessage,
        severity: 'error'
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (name === 'confirmPassword') {
      setMatchPwd(value);
      const confirmPwdMsg = validateConfirmPassword(formData.password, value);
      setValidMatch(confirmPwdMsg === '');
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
    <motion.div className="signup-body" initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    transition={pageTransition}>
      {/* <button className="signup_back_button" onClick={() => navigate('/home')}>
        <img src="/pic/chess48.png" alt="Back" />
      </button> */}
      <div className="signup-container">
        <section className="signup-card">
          <h1 style={{ textAlign: 'center', color: '#000080', transform: 'scale(1.5)' }}>Sign Up</h1>
          {alert.message && (
            <Alert severity={alert.severity} style={{ marginBottom: '20px' }}>
              {alert.message}
            </Alert>
          )}
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={handleInputChange}
                value={formData.username}
                required
              />
            </div>
            <div className="signup-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleInputChange}
                value={formData.email}
                required
              />
            </div>
            <div className="signup-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleInputChange}
                value={formData.password}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                required
              />
              <p className={pwdFocus && passwordValidationMsg ? 'instructions' : 'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle} />
                {passwordValidationMsg}
              </p>
            </div>
            <div className="signup-form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleInputChange}
                
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                required
              />
              <p className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle} />
                {!validMatch && confirmPwdValidationMsg}
              </p>
            </div>
            <div className="remem">
              <label htmlFor="remember">
                <input type="checkbox" id="remember" />
                <span>Remember me</span>
              </label>
              <label>
                <a href="#" style={{ color: '#CFB095' }}>Forgot Password</a>
              </label>
            </div>
            <button type="submit" className='submit_button'>Sign Up</button>
            <p style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '1em' }}>
              <Link to="/login" style={{ color: '#CFB095' }}>Already have an account? Login</Link>
            </p>
            <hr />
            <div className='othapp'>
              <button>
                <img src='https://www.liblogo.com/img-logo/go567g8f1-google-logo-google-pushes-for-pixel-perfect-logo-google-the-guardian.png'
                  style={{ width: '15px', paddingRight: '5px' }} alt="Google logo" />
                Login using Google
              </button>
            </div>
          </form>
        </section>
      </div>
    </motion.div>
  );
};

export default Signup;