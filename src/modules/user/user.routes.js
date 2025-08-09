const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/forgot-password', userController.forgotPassword);

module.exports = router;
