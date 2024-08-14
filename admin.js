import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users');
                setUsers(response.data);
            } catch (err) {
                console.error("Error fetching user data:", err.response ? err.response.data : err.message);
                setError('Error fetching user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const determineRole = (email) => {
        return email && typeof email === 'string' && email.includes('@knightspath.in') ? 'Admin' : 'Student';
    };

    const handleEdit = (userId) => {
        navigate(`/edit-user/${userId}`);
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:3001/users/${userId}`);
            setUsers(users.filter(user => user.id !== userId));
        } catch (err) {
            console.error("Error deleting user:", err.response ? err.response.data : err.message);
            setError('Error deleting user');
        }
    };

    return (
        <div className="admin-page-unique">
            <button className="login-back-button" onClick={() => navigate('/home')}>
                <img src="/pic/chess48.png" alt="Back" />
            </button>
            <h1 className="admin-page-title-unique">Admin Page</h1>
            <button className="add-admin-button-unique" onClick={() => navigate('/add-admin')}>Add Admin Profile</button>
            {loading ? (
                <p className="admin-page-loading-unique">Loading...</p>
            ) : error ? (
                <p className="admin-page-error-unique">{error}</p>
            ) : (
                <table className="admin-page-table-unique">
                    <thead>
                        <tr>
                            <th className="admin-page-table-header-unique">ID</th>
                            <th className="admin-page-table-header-unique">Username</th>
                            <th className="admin-page-table-header-unique">Email</th>
                            <th className="admin-page-table-header-unique">Password</th>
                            <th className="admin-page-table-header-unique">Role</th>
                            <th className="admin-page-table-header-unique">Edit</th>
                            <th className="admin-page-table-header-unique">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td className="admin-page-table-data-unique">{user.id}</td>
                                <td className="admin-page-table-data-unique">{user.Username}</td>
                                <td className="admin-page-table-data-unique">{user.Email}</td>
                                <td className="admin-page-table-data-unique">{user.Password}</td>
                                <td className="admin-page-table-data-unique">
                                    {determineRole(user.Email)}
                                </td>
                                <td className="admin-page-table-data-unique">
                                    <button
                                        className="edit-button-unique"
                                        onClick={() => handleEdit(user.id)}
                                    >
                                        EDIT
                                    </button>
                                </td>
                                <td className="admin-page-table-data-unique">
                                    <button
                                        className="delete-button-unique"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        DELETE
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminPage;
