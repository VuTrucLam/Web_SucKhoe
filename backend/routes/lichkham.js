const express = require('express');
const router = express.Router();
const lichKhamController = require('../controllers/lichKhamController');
const authenticateToken = require('../middleware/authMiddleware');

// POST: Thêm lịch khám
router.post('/', authenticateToken, lichKhamController.addLichKham);

// GET: Lấy tất cả lịch khám
router.get('/', authenticateToken, lichKhamController.getAllLichKham);

module.exports = router;
