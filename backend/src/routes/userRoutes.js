const express = require('express');
const { getAllUsers, getUserById } = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getUserById);

module.exports = router;
