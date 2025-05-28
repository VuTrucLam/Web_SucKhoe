const express = require('express');
const router = express.Router();
const theodoidieutriController = require('../controllers/theodoiController');

// Route thêm lịch theo dõi điều trị
router.post('/', theodoidieutriController.addTheoDoiDieuTri);

module.exports = router;
