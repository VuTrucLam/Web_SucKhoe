const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/profile', authMiddleware, doctorController.createDoctorProfile);

module.exports = router;
