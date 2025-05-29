const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require("../middleware/authMiddleware");
router.get("/me", authenticateToken, userController.getUserInfo);
router.put('/me', authenticateToken, userController.updateMe);
module.exports = router;
