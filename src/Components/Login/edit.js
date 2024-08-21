import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './edit.css';

const EditUserPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        Username: '',
        Email: '',
        Password: '',
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/users/${userId}`);
                setUser(response.data);
                setFormData({
                    Username: response.data.Username,
                    Email: response.data.Email,
                    Password: response.data.Password,
                });
            } catch (err) {
                console.error("Error fetching user data:", err.response ? err.response.data : err.message);
                setError('Error fetching user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

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
            await axios.put(`http://localhost:3001/users/${userId}`, formData);
            navigate('/admin');
        } catch (err) {
            console.error("Error updating user data:", err.response ? err.response.data : err.message);
            setError('Error updating user data');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="edit-user-page">
            <button className="back-button" onClick={() => navigate('/admin')}>Back to Admin Page</button>
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="Username"
                        value={formData.Username}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="Password"
                        value={formData.Password}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditUserPage;
