/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirm_password:
 *                 type: string
 *               userType:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: User already exists
 */
const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/forgot-password', userController.forgotPassword);

module.exports = router;
