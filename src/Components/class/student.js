import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './student.css';
import FileList from './file';
import { motion } from 'framer-motion';

const Student = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState({ links: [], files: [], videos: [], msgs: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const [linksResponse, filesResponse, videosResponse, msgsResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/links/'),
          axios.get('http://localhost:8000/api/files/'),
          axios.get('http://localhost:8000/api/videos/'),
          axios.get('http://localhost:8000/api/msgs/')
        ]);

        setResources({
          links: linksResponse.data,
          files: filesResponse.data,
          videos: videosResponse.data,
          msgs: msgsResponse.data
        });
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
    <motion.div className='student-page'
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}>
      <button className="signup_back_button" onClick={() => navigate('/home')}>
        <img src="/pic/chess48.png" alt="Back" />
      </button>
      <div className="student-container">
        <h2>Student Resources</h2>

        <div className="resource-section">
          <h3>Links</h3>
          <ul>
            {resources.links.length > 0 ? (
              resources.links.map(link => (
                <li key={link.id}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.url}
                  </a>
                </li>
              ))
            ) : (
              <li>No links available</li>
            )}
          </ul>
        </div>

        <div className="resource-section">
          <h3>Files</h3>
          <FileList/>
        </div>

        

        <div className="resource-section">
          <h3>Messages</h3>
          <ul>
            {resources.msgs.length > 0 ? (
              resources.msgs.map(msg => (
                <li key={msg.id} className="message-item">
                  {msg.message} 
                  <span className="message-time">Sent: {msg.created_at}</span>
                </li>
              ))
            ) : (
              <li>No messages available</li>
            )}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Student;
