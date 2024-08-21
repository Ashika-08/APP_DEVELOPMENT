import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './conduct.css';
import { motion } from 'framer-motion';

const ConductTournament = () => {
  const [tournamentName, setTournamentName] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [category, setCategory] = useState('');
  const [mode, setMode] = useState('online');
  const [time, setTime] = useState('12:00:00'); // Default time format HH:MM:SS
  const [venue, setVenue] = useState('');
  const [batchSize, setBatchSize] = useState('');
  const [tournamentCode, setTournamentCode] = useState('');

  const navigate = useNavigate();

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars[randomIndex];
    }
    return code;
  };

  const handleAddTournament = async () => {
    const code = generateCode();
    const limit = batchSize * 2;
    const newTournament = {
      tournamentName,
      organizerName,
      category,
      mode,
      time, // Ensure time is in HH:MM:SS format
      venue: mode === 'offline' ? venue : null,
      batchSize: mode === 'online' ? batchSize : null,
      tournamentCode: code,
      participantLimit: limit,
      participants: [],
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/tournaments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTournament),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert('Failed to create tournament: ' + (errorData.detail || 'Unknown error'));
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Tournament created successfully:', result);
      setTournamentCode(code);
      setTournamentName('');
      setOrganizerName('');
      setCategory('');
      setMode('online');
      setTime('12:00:00');
      setVenue('');
      setBatchSize('');
    } catch (error) {
      console.error('Error creating tournament:', error);
      alert('An error occurred while creating the tournament: ' + error.message);
    }
  };

  const handleSwitchToJoin = () => {
    navigate('/join');
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
    <motion.div className='conduct-tournament-page' initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    transition={pageTransition}>
      <button className="signup_back_button" onClick={() => navigate('/home')}>
        <img src="/pic/chess48.png" alt="Back" />
      </button>
      <div className="conduct-tournament-form">
        <h2>Conduct a Tournament</h2>
        <input
          type="text"
          placeholder="Tournament Name"
          value={tournamentName}
          onChange={(e) => setTournamentName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Organizer Name"
          value={organizerName}
          onChange={(e) => setOrganizerName(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="under 10">Under 10</option>
          <option value="under 18">Under 18</option>
          <option value="open">Open</option>
        </select>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        {mode === 'offline' && (
          <input
            type="text"
            placeholder="Venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
        )}
        {mode === 'online' && (
          <select value={batchSize} onChange={(e) => setBatchSize(e.target.value)}>
            <option value="">Select Batch Size</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        )}
        <button onClick={handleAddTournament}>Create Tournament</button>
        {/* <button onClick={handleSwitchToJoin}>Switch to Join Tournament</button> */}
        {tournamentCode && (
          <div className="tournament-code">
            <p>Your tournament code is: <strong>{tournamentCode}</strong></p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ConductTournament;
