const pool = require('../config/database');

const getAllUsers = async (req, res) => {
    const { search, start, end } = req.query;
    let query = 'SELECT * FROM users WHERE 1=1';
    const params = [];

    if (search) {
        params.push(`%${search}%`);
        query += ` AND username ILIKE $${params.length}`;
    }

    if (start && end) {
        params.push(start);
        query += ` AND created_at >= $${params.length}`;
        params.push(end);
        query += ` AND created_at <= $${params.length}`;
    }

    try {
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching users', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching user by ID', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getAllUsers, getUserById };
