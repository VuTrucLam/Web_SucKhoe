const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');
const authenticateToken = require("../middleware/authMiddleware");

// Tạo mới hồ sơ sức khỏe
router.post('/', authenticateToken, healthController.createHealthProfile);
router.get('/', authenticateToken, healthController.getHealthProfile);
router.put('/', authenticateToken, healthController.updateHealthProfile);

module.exports = router;
