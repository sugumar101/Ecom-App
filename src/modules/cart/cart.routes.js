/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management
 */

/**
 * @swagger
 * /api/cart/checkout:
 *   post:
 *     summary: Checkout and redirect to payment
 *     tags: [Cart]
 *     responses:
 *       302:
 *         description: Redirect to payment
 */
const express = require('express');
const router = express.Router();
const cartController = require('./cart.controller');
const { authenticateToken } = require('../../middlewares/auth');

// Checkout API - redirects to payment page
router.post('/checkout', authenticateToken, cartController.checkout);
router.get('/', authenticateToken, cartController.getCart);
router.delete('/:id', authenticateToken, cartController.deleteCartItem);

module.exports = router;
