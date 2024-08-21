// import React, { useState } from 'react';
// import axios from 'axios';
// import './instructor.css';
// import { useNavigate } from 'react-router-dom';

// const VisuallyHiddenInput = ({ onChange }) => (
//   <input
//     type="file"
//     multiple
//     onChange={onChange}
//     style={{
//       position: 'absolute',
//       width: '1px',
//       height: '1px',
//       padding: '0',
//       margin: '-1px',
//       overflow: 'hidden',
//       clip: 'rect(0,0,0,0)',
//       border: '0',
//     }}
//   />
// );

// const CustomFileUpload = ({ onChange, label, iconSrc }) => (
//   <label className="custom-file-upload">
//     <img src="/pic/chess44.png" className="upload-icon" alt="Upload Icon" />
//     {label}
//     <VisuallyHiddenInput onChange={onChange} />
//   </label>
// );

// const Instructor = () => {
//   const navigate = useNavigate();
//   const [link, setLink] = useState('');
//   const [files, setFiles] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [message, setMessage] = useState('');

//   const handleLinkChange = (e) => {
//     setLink(e.target.value);
//   };

//   const handleFilesChange = (e) => {
//     setFiles(Array.from(e.target.files));
//   };

//   const handleVideosChange = (e) => {
//     setVideos(Array.from(e.target.files));
//   };

//   const handleMessageChange = (e) => {
//     setMessage(e.target.value);
//   };

//   const handleSubmit = async () => {
//     try {
//       if (link) {
//         await axios.post('http://localhost:3002/links', { url: link });
//       }

//       if (files.length > 0) {
//         const formData = new FormData();
//         files.forEach((file) => formData.append('files', file));
//         await axios.post('http://localhost:3002/files', formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//       }

//       if (videos.length > 0) {
//         const formData = new FormData();
//         videos.forEach((video) => formData.append('videos', video));
//         await axios.post('http://localhost:3002/videos', formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//       }

//       if (message) {
//         await axios.post('http://localhost:3002/msgs', { 'message': message });
//       }

//       alert('Submission successful!');
//       setLink('');
//       setFiles([]);
//       setVideos([]);
//       setMessage('');
//     } catch (error) {
//       console.error('Error submitting data:', error);
//       alert('Error submitting data. Please try again.');
//     }
//   };

//   return (
//     <div className="instructor-container">
//       <button className="signup_back_button" onClick={() => navigate('/home')}>
//         <img src="/pic/chess48.png" alt="Back" />
//       </button>
//       <h2>Instructor Upload</h2>

//       <div className="upload-section">
//         <h3>Submit a Link</h3>
//         <input
//           type="text"
//           placeholder="Paste your link here"
//           value={link}
//           onChange={handleLinkChange}
//         />
//       </div>

//       <div className="upload-section">
//         <h3>Upload Files</h3>
//         <CustomFileUpload onChange={handleFilesChange} label="Upload Files" iconSrc="/path/to/your/icon.png" />
//       </div>

//       <div className="upload-section">
//         <h3>Upload Videos</h3>
//         <CustomFileUpload onChange={handleVideosChange} label="Upload Videos" iconSrc="/path/to/your/icon.png" />
//       </div>

//       <div className="upload-section">
//         <h3>Add Message</h3>
//         <input
//           type="text"
//           placeholder="Write your message here"
//           value={message}
//           onChange={handleMessageChange}
//         />
//       </div>

//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

// export default Instructor;


import './instructor.css';
// Instructor.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UploadFile from './fileupload';
import { motion } from 'framer-motion';

const Instructor = () => {
  const navigate = useNavigate();
  const [link, setLink] = useState('');
  const [files, setFiles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState('');

  const handleLinkChange = (e) => setLink(e.target.value);
  const handleFilesChange = (e) => setFiles(Array.from(e.target.files));
  const handleVideosChange = (e) => setVideos(Array.from(e.target.files));
  const handleMessageChange = (e) => setMessage(e.target.value);

  const handleSubmit = async () => {
    try {
      if (files.length > 0) {
        const formData = new FormData();
        files.forEach((file) => formData.append('pdf', file));

        await axios.post('http://localhost:8000/files/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      if (link) {
        await axios.post('http://localhost:8000/api/links/', { url: link });
      }

      if (videos.length > 0) {
        const formData = new FormData();
        videos.forEach((video) => formData.append('video', video));

        await axios.post('http://localhost:8000/api/videos/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      if (message) {
        await axios.post('http://localhost:8000/api/msgs/', { message });
      }

      alert('Submission successful!');
      setLink('');
      setFiles([]);
      setVideos([]);
      setMessage('');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error submitting data. Please try again.');
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
    <motion.div className="instructor-container" initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    transition={pageTransition}>
      <button className="signup_back_button" onClick={() => navigate('/home')}>
        <img src="/pic/chess48.png" alt="Back" />
      </button>
      <h2>Instructor Upload</h2>

      <div className="upload-section">
        <h3>Submit a Link</h3>
        <input
          type="text"
          placeholder="Paste your link here"
          value={link}
          onChange={handleLinkChange}
        />
      </div>

      <div className="upload-section">
        <UploadFile/>
      </div>

      {/* <div className="upload-section">
        <h3>Upload Videos</h3>
        <input
          type="file"
          multiple
          onChange={handleVideosChange}
        />
      </div> */}

      <div className="upload-section">
        <h3>Add Message</h3>
        <input
          type="text"
          placeholder="Write your message here"
          value={message}
          onChange={handleMessageChange}
        />
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </motion.div>
  );
};

export default Instructor;
