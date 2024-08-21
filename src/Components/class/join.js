import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './join.css';
import { motion } from 'framer-motion';

const JoinTournament = () => {
  const [tournaments, setTournaments] = useState([]);
  const [joinTournamentCode, setJoinTournamentCode] = useState('');
  const [joinName, setJoinName] = useState('');
  const [joinEmail, setJoinEmail] = useState('');
  const [tournamentDetails, setTournamentDetails] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/tournaments/')
      .then(response => setTournaments(response.data))
      .catch(error => console.error('Error fetching tournaments:', error));
  }, []);

  useEffect(() => {
    if (joinTournamentCode) {
      axios.get(`http://127.0.0.1:8000/api/tournaments/${joinTournamentCode}/`)
        .then(response => setTournamentDetails(response.data))
        .catch(error => console.error('Error fetching tournament details:', error));
    }
  }, [joinTournamentCode]);

  const handleJoinTournament = async () => {
    if (!joinTournamentCode || !joinName || !joinEmail) {
      alert('Please fill all the fields.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/participants/', {
        name: joinName,
        email: joinEmail,
        tournamentCode: joinTournamentCode
      });

      if (response.status === 201) {
        alert(response.data.message || 'Successfully joined the tournament!');
        setJoinTournamentCode('');
        setJoinName('');
        setJoinEmail('');
        setTournamentDetails(null);
      } else {
        alert('Error joining the tournament. Please try again.');
        console.error('Error details:', response.data);
      }
    } catch (error) {
      console.error('Error joining tournament:', error);
      alert('Error joining the tournament. Please try again.');
    }
  };

  const handleSwitchToConduct = () => {
    navigate('/con');
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
    <motion.div className='join-tournament-page' initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    transition={pageTransition}>
      <button className="join_back_button" onClick={() => navigate('/home')}>
        <img src="/pic/chess48.png" alt="Back" />
      </button>
      <div className="join-tournament-form">
        <h2>Join a Tournament</h2>
        <select
          value={joinTournamentCode}
          onChange={(e) => setJoinTournamentCode(e.target.value)}
        >
          <option value="">Select Tournament</option>
          {tournaments.map((tournament) => (
            <option key={tournament.tournamentCode} value={tournament.tournamentCode}>
              {tournament.tournamentName || 'Unnamed Tournament'} ({tournament.tournamentCode})
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Name"
          value={joinName}
          onChange={(e) => setJoinName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={joinEmail}
          onChange={(e) => setJoinEmail(e.target.value)}
        />
        <button onClick={handleJoinTournament}>Join Tournament</button>
        {/* <button onClick={handleSwitchToConduct}>Switch to Conduct Tournament</button> */}
        
        {tournamentDetails && (
          <div className="tournament-details">
            <p><strong>Time:</strong> {tournamentDetails.time}</p>
            {tournamentDetails.mode === 'offline' && (
              <p><strong>Venue:</strong> {tournamentDetails.venue}</p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default JoinTournament;
