import React, { useEffect, useState, useCallback } from 'react';
import { fetchUsers } from '../../api/api';
import Card from '../components/Card';
import { debounce } from '../utils/debounce';
import '../App.css';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [loading, setLoading] = useState(true);

    const loadUsers = useCallback(
        debounce(async () => {
            setLoading(true);
            try {
                const params = {
                    search: searchQuery,
                    ...dateRange,
                };
                const { data } = await fetchUsers(params);
                setUsers(data);
            } catch (err) {
                console.error('Error fetching users:', err);
            } finally {
                setLoading(false);
            }
        }, 500),
        [searchQuery, dateRange]
    );

    useEffect(() => {
        loadUsers();
        return () => loadUsers.cancel(); // Cancel the debounced call on component unmount
    }, [searchQuery, dateRange, loadUsers]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleDateChange = (e) => {
        setDateRange({ ...dateRange, [e.target.name]: e.target.value });
    };

    if (loading) {
        return <p className="dashboard-title">Loading users...</p>;
    }

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">User Dashboard</h1>
            <div className="filter-bar">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-bar"
                />
            </div>
            <div>
                <label><strong>Start Date </strong></label>
                <input
                    type="date"
                    name="start"
                    value={dateRange.start}
                    onChange={handleDateChange}
                />
                <label><strong>End Date </strong></label>
                <input
                    type="date"
                    name="end"
                    value={dateRange.end}
                    onChange={handleDateChange}
                />
                <button className='filter-button' onClick={handleDateChange}>Apply Filter</button>
            </div>
            <div style={styles.cardContainer}>
                {users.map((user) => (
                    <Card key={user.id} id={user.id} username={user.username} place={user.place} />
                ))}
            </div>
        </div>
    );
};

const styles = {
    cardContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '16px',
        marginTop: '16px',
    },
};

export default Dashboard;
