const express = require('express');
const router = express.Router();
const thuocController = require('../controllers/thuocController');
const authenticateToken = require('../middleware/authMiddleware');

// GET: Tìm kiếm thuốc theo từ khóa
router.get('/search', authenticateToken, thuocController.searchThuoc);

module.exports = router;
