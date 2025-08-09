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
