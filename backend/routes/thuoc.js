const express = require('express');
const router = express.Router();
const thuocController = require('../controllers/thuocController');
const authenticateToken = require('../middleware/authMiddleware');
router.get('/search', authenticateToken, thuocController.searchThuoc);

module.exports = router;
