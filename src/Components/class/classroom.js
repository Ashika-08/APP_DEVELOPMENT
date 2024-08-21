// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './classroom.css';

// const Classroom = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.get('http://localhost:3001/users');
//       const users = response.data;

//       const user = users.find(
//         (user) => 
//           (user.email === email || user.Email === email) &&
//           (user.password === password || user.Password === password)
//       );

//       if (user) {
//         if (email.includes('@knightspath.in')) {
//           navigate('/ins');
//         } else {
//           navigate('/stu');
//         }
//       } else {
//         setError('Invalid email or password');
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       setError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className='classroom-page'>
//       <div className="classroom-container">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           {error && <p className="error-message">{error}</p>}
//           <button type="submit">Login</button>
//         </form>
//       </div>
//       <div className="back-button" onClick={() => navigate('/home')}>
//         <img src="/pic/chess48.png" alt="Back" />
//       </div>
//     </div>
//   );
// };

// export default Classroom;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './classroom.css';

const Classroom = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      setError('You must be logged in to access the classroom.');
      navigate('/login');
      return;
    }

    const user = JSON.parse(userData);

    // If role is already stored locally
    if (user.role) {
      navigateBasedOnRole(user.role);
    } else {
      // Fetch user details to get the role
      fetchUserRole(user.id);
    }
  }, [navigate]);

  const fetchUserRole = async (userId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/user-details/?user_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      const userRole = response.data.role;
      const updatedUser = { ...JSON.parse(localStorage.getItem('user')), role: userRole };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      navigateBasedOnRole(userRole);
    } catch (error) {
      console.error('Error fetching user role:', error);
      setError('Unable to fetch user role. Please try again.');
    }
  };

  const navigateBasedOnRole = (role) => {
    if (role === 'Instructor') {
      navigate('/ins');
    } else {
      navigate('/stu');
    }
  };

  return (
    <div className='classroom-page'>
      <div className="classroom-container">
        <h2>Classroom</h2>
        {error && <p className="error-message">{error}</p>}
      </div>
      <div className="back-button" onClick={() => navigate('/home')}>
        <img src="/pic/chess48.png" alt="Back" />
      </div>
    </div>
  );
};

export default Classroom;
