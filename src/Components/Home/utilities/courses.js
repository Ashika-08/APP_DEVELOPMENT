// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; 
// import './courses.css'; // Import the CSS specific to this component
// import axios from 'axios';

// const Courses = () => {
//     const [courses, setCourses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchCourses = async () => {
//             try {
//                 const response = await axios.get(' http://localhost:3002/courses');
//                 setCourses(response.data);
//             } catch (err) {
//                 console.error("Error fetching course data:", err.message);
//                 setError('Error fetching course data');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCourses();
//     }, []);

//     return (
//         <div>
//             <h2 className="courses-title">Explore our courses and experience the Magic</h2>
//             <div className="courses-container">
//                 {loading ? (
//                     <p>Loading...</p>
//                 ) : error ? (
//                     <p>{error}</p>
//                 ) : (
//                     <div className="courses-scroll">
//                         {courses.map((course, index) => (
//                             <div key={index} className="course-item">
//                                 <img src={course.icon} alt={course.title} />
//                                 <h3>{course.title}</h3>
//                                 <p className="course-age">{course.age}</p>
//                                 <p className="course-description">{course.description}</p>
//                                 <Link to={course.path} className="learn-more-button">Learn More</Link>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Courses;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './courses.css'; // Import the CSS specific to this component
import axios from 'axios';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Use the Django API endpoint to fetch courses
                const response = await axios.get('http://127.0.0.1:8000/api/courses/');
                setCourses(response.data);
            } catch (err) {
                console.error("Error fetching course data:", err.message);
                setError('Error fetching course data');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div>
            <h2 className="courses-title">Explore our courses and experience the Magic</h2>
            <div className="courses-container">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="courses-scroll">
                        {courses.map((course, index) => (
                            <div key={index} className="course-item">
                                <img src={course.icon} alt={course.title} />
                                <h3>{course.title}</h3>
                                <p className="course-age">{course.age}</p>
                                <p className="course-description">{course.description}</p>
                                <Link to={course.path} className="learn-more-button">Learn More</Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Courses;
