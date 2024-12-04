import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserDetails } from '../../api/api';
import '../App.css';

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetail = async () => {
            try {
                const { data } = await fetchUserDetails(id);
                setUser(data);
            } catch (err) {
                console.error('Error fetching user details:', err);
                setError('Unable to load user details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetail();
    }, [id]);

    if (loading) {
        return <p className="loading-text">Loading user details...</p>;
    }

    if (error) {
        return <p className="dashboard-title">{error}</p>;
    }

    return (
        <div className="user-details">
            <h2 className="details-title">User Details</h2>
            {user ? (
                <div className="details-card">
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Place:</strong> {user.place}</p>
                </div>
            ) : (
                <p className="no-user">User not found.</p>
            )}
        </div>
    );
};

export default UserDetails;
