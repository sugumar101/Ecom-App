// Swagger setup
const { swaggerUi, swaggerSpec } = require('./utils/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const express = require('express');
const bodyParser = require('body-parser');
const setRoutes = require('./routes/index');
const { errorHandler } = require('./middlewares/index');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up routes
setRoutes(app);

// Error handling middleware
app.use(errorHandler);

// Sync database and start the server
const { Product } = require('./models/product.model'); 

sequelize.sync()
    .then(async () => {
    const logger = require('./utils/logger');
    logger.info('Database synced');
        // Insert sample products if table is empty
        const count = await Product.count();
        if (count === 0) {
            await Product.bulkCreate([
                { name: 'iPhone 15', price: 999, description: 'Latest Apple iPhone', category: 'electronics' },
                { name: 'Samsung Galaxy S24', price: 899, description: 'Flagship Samsung phone', category: 'electronics' },
                { name: 'Sony WH-1000XM5', price: 349, description: 'Noise Cancelling Headphones', category: 'audio' },
                { name: 'Dell XPS 13', price: 1200, description: 'Ultrabook Laptop', category: 'computers' },
                { name: 'Nike Air Max', price: 150, description: 'Running Shoes', category: 'footwear' },
                { name: 'Apple Watch Series 9', price: 399, description: 'Smart Watch', category: 'wearables' },
                { name: 'Canon EOS R8', price: 1500, description: 'Mirrorless Camera', category: 'cameras' },
                { name: 'Amazon Echo Dot', price: 49, description: 'Smart Speaker', category: 'audio' },
                { name: 'HP Envy 15', price: 1100, description: 'Powerful Laptop', category: 'computers' },
                { name: 'Adidas Ultraboost', price: 180, description: 'Performance Running Shoes', category: 'footwear' }
            ]);
            logger.info('Sample products inserted');
        }
        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to sync database:', err);
    });