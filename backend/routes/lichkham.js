const express = require('express');
const router = express.Router();
const lichKhamController = require('../controllers/lichKhamController');
const authenticateToken = require('../middleware/authMiddleware');
router.post('/', authenticateToken, lichKhamController.addLichKham);
router.get('/', authenticateToken, lichKhamController.getAllLichKham);

module.exports = router;
