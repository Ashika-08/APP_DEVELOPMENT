// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate,useLocation } from 'react-router-dom';
// import SignupPage from './Components/signup/singup';
// import LoginPage from './Components/Login/login';
// import HomePage from './Components/Home/home';
// import Beginner from './Components/Home/content/beginner';
// import Intermediate from './Components/Home/content/intermediate';
// import Advance from './Components/Home/content/advance';
// import Personal from './Components/Home/content/personal';
// import Demo from './Components/Home/content/demo';
// import ConductTournament from './Components/class/conduct';
// import Instructor from './Components/class/instructor';
// import Student from './Components/class/student';
// import JoinTournament from './Components/class/join';
// import Classroom from './Components/class/classroom';
// import ProfilePage from './Components/Login/profile';
// import ContactForm from './Components/Login/contact';
// import AdminPage from './Components/Login/admin';
// import EditUserPage from './Components/Login/edit';
// import AddAdminPage from './Components/Login/addadmin';
// import AddCoursesPage from './Components/Login/addcourses';
// import CourseRegistrationForm from './Components/class/courseregistration';
// import FileList from './Components/class/file';
// import UploadFile from './Components/class/fileupload';
// import LaunchImage from './Components/Home/content/launch';
// import LandingPage from './Components/Login/landingpage';
// import { AnimatePresence } from 'framer-motion';

// // Function to check if the user is authenticated
// const isAuthenticated = () => {
//     return !!localStorage.getItem('authToken'); // Check for token or other authentication indicators
// };
// // PrivateRoute component to protect routes
// const PrivateRoute = ({ element: Element, ...rest }) => {
//     return isAuthenticated() ? <Element {...rest} /> : <Navigate to="/login" />;
// };
// function App() {
//     const location = useLocation();
//     return (
//         <AnimatePresence exitBeforeEnter>
//             <Routes>
//                 <Route path="/" element={<SignupPage />} />
//                 <Route path="/login" element={<LoginPage />} />
//                 <Route path="/home" element={<PrivateRoute element={HomePage} />} />
//                 <Route path="/beg" element={<Beginner />} />
//                 <Route path="/inter" element={<Intermediate />} />
//                 <Route path="/adv" element={<Advance />} />
//                 <Route path="/per" element={<Personal />} />
//                 <Route path="/demo" element={<Demo />} />
//                 <Route path="/con" element={<ConductTournament />} />
//                 <Route path="/join" element={<JoinTournament />} />
//                 <Route path="/ins" element={<Instructor />} />
//                 <Route path="/stu" element={<Student />} />
//                 <Route path="/class" element={<Classroom />} />
//                 <Route path="/pro" element={<ProfilePage />} />
//                 <Route path="/faq" element={<ContactForm/>}/>
//                 <Route path="/admin" element={<AdminPage/>}/>
//                 <Route path='/edit-user/:userId' element={<EditUserPage/>}/>
//                 <Route path="/add-admin" element={<AddAdminPage/>}/>
//                 <Route path='/addcourses' element={<AddCoursesPage/>}/>
//                 <Route path='/coursereg' element={<CourseRegistrationForm/>}/>
//                 <Route path='/file' element={<FileList/>}/>
//                 <Route path='/fileupload' element={<UploadFile/>}/>
//                 <Route path='/launch' element={<LaunchImage/>}/>
//                 <Route path='/land' element={<LandingPage/>}/>
//             </Routes>
//         </AnimatePresence>
//     );
// }

// export default AnimatedApp(){
//     return (
//         <Router>
//             <App />
//         </Router>
//     );
// }


import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import SignupPage from './Components/signup/singup';
import LoginPage from './Components/Login/login';
import HomePage from './Components/Home/home';
import Beginner from './Components/Home/content/beginner';
import Intermediate from './Components/Home/content/intermediate';
import Advance from './Components/Home/content/advance';
import Personal from './Components/Home/content/personal';
import Demo from './Components/Home/content/demo';
import ConductTournament from './Components/class/conduct';
import Instructor from './Components/class/instructor';
import Student from './Components/class/student';
import JoinTournament from './Components/class/join';
import Classroom from './Components/class/classroom';
import ProfilePage from './Components/Login/profile';
import ContactForm from './Components/Login/contact';
import AdminPage from './Components/Login/admin';
import EditUserPage from './Components/Login/edit';
import AddAdminPage from './Components/Login/addadmin';
import AddCoursesPage from './Components/Login/addcourses';
import CourseRegistrationForm from './Components/class/courseregistration';
import FileList from './Components/class/file';
import UploadFile from './Components/class/fileupload';
import LaunchImage from './Components/Home/content/launch';
import LandingPage from './Components/Login/landingpage';
import { AnimatePresence } from 'framer-motion';
import ContactUs from './Components/Login/contactus';
import AboutUs from './Components/Login/aboutus';
import WhyChooseUs from './Components/Login/test';

// Function to check if the user is authenticated
const isAuthenticated = () => {
    return !!localStorage.getItem('authToken'); // Check for token or other authentication indicators
};

// PrivateRoute component to protect routes
const PrivateRoute = ({ element: Element, ...rest }) => {
    return isAuthenticated() ? <Element {...rest} /> : <Navigate to="/login" />;
};

function App() {
    const location = useLocation();
    return (
        <AnimatePresence wait>
            <Routes location={location} key={location.pathname}>
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<PrivateRoute element={HomePage} />} />
                <Route path="/beg" element={<Beginner />} />
                <Route path="/inter" element={<Intermediate />} />
                <Route path="/adv" element={<Advance />} />
                <Route path="/per" element={<Personal />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/con" element={<ConductTournament />} />
                <Route path="/join" element={<JoinTournament />} />
                <Route path="/ins" element={<Instructor />} />
                <Route path="/stu" element={<Student />} />
                <Route path="/class" element={<Classroom />} />
                <Route path="/pro" element={<ProfilePage />} />
                <Route path="/faq" element={<ContactForm />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path='/edit-user/:userId' element={<EditUserPage />} />
                <Route path="/add-admin" element={<AddAdminPage />} />
                <Route path='/addcourses' element={<AddCoursesPage />} />
                <Route path='/coursereg' element={<CourseRegistrationForm />} />
                <Route path='/file' element={<FileList />} />
                <Route path='/fileupload' element={<UploadFile />} />
                <Route path='/launch' element={<LaunchImage />} />
                <Route path='/' element={<LandingPage />} />
                <Route path='/contactus' element={<ContactUs/>}/>
                <Route path='/about' element={<AboutUs/>}/>
                <Route path='/test' element={<WhyChooseUs/>}/>
            </Routes>
        </AnimatePresence>
    );
}

// Corrected export of the AnimatedApp component
export default function AnimatedApp() {
    return (
        <Router>
            <App />
        </Router>
    );
}
