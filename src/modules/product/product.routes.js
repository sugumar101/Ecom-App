/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get all products (with optional filters)
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by product name
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *     responses:
 *       200:
 *         description: List of products
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Bad request
 */
const express = require('express');
const router = express.Router();
const productController = require('./product.controller');
const { authenticateToken } = require('../../middlewares/auth');

// Protect all product routes

router.get('/', authenticateToken, productController.getProducts);
router.post('/', authenticateToken, productController.createProduct);
router.get('/:id', authenticateToken, productController.getProductById);
// Business user can edit their own product
router.put('/:id', authenticateToken, productController.updateProduct);

module.exports = router;
