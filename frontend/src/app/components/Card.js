import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ id, username, place }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/user/${id}`);
    };

    return (
        <div onClick={handleClick} style={styles.card}>
            <h3>{username}</h3>
            <p><strong>ID:</strong> {id}</p>
            <p><strong>Place:</strong> {place}</p>
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '8px',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s',
    },
};

export default Card;
