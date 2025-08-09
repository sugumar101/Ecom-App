const express = require('express');
//const IndexController = require('../controllers/index').IndexController;
const userRoutes = require('../modules/user/user.routes');
const productRoutes = require('../modules/product/product.routes');
const cartRoutes = require('../modules/cart/cart.routes');

const router = express.Router();
//const indexController = new IndexController();

function setRoutes(app) {
  // Legacy product routes (optional, can be removed if not needed)
  //  router.get('/products', indexController.getProducts.bind(indexController));
  // router.post('/products', indexController.createProduct.bind(indexController));

  // Mount user and product module routes

  router.use('/user', userRoutes);
  router.use('/product', productRoutes);
  router.use('/cart', cartRoutes);

  app.use('/api', router);
}

module.exports = setRoutes;
