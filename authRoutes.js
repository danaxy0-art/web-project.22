const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// رابط التسجيل: POST /api/auth/register
router.post('/register', authController.register);

// رابط الدخول: POST /api/auth/login
router.post('/login', authController.login);

module.exports = router;
