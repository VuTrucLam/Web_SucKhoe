const express = require('express');
const router = express.Router();
const theodoidieutriController = require('../controllers/theodoiController');
router.post('/', theodoidieutriController.addTheoDoiDieuTri);
module.exports = router;
