import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './addadmin.css';

const AddAdminPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Username: '',
        Email: '',
        Password: '',
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/users', formData);
            navigate('/admin');
        } catch (err) {
            console.error("Error adding admin profile:", err.response ? err.response.data : err.message);
            setError('Error adding admin profile');
        }
    };

    return (
        <div className="add-admin-page">
            <button className="back-button" onClick={() => navigate('/admin')}>Back to Admin Page</button>
            <h1>Add Admin Profile</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="Username"
                        value={formData.Username}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="Password"
                        value={formData.Password}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <button type="submit">Add Admin</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default AddAdminPage;
