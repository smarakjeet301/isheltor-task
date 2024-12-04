const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const { username, password } = req.body;

    // Hardcoded credentials for simplicity
    if (username === 'admin' && password === 'password') {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }

    res.status(401).json({ error: 'Invalid credentials' });
};

module.exports = { login };
