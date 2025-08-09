exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category } = req.body;
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Only business users can edit
    if (user.userType !== 'Business') {
      return res.status(403).json({ message: 'Only business users can edit products.' });
    }
    // Find product and check ownership (assuming a userId field exists)
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.userId !== user.id) {
      return res.status(403).json({ message: 'You can only edit your own products.' });
    }
    await product.update({ name, price, description, category });
    res.json({ message: 'Product updated successfully', product });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
};
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
};
const { Product } = require('../../models/product.model');

exports.getProducts = async (req, res) => {
  const logger = require('../../utils/logger');
  logger.info('get Products');
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const { name, category } = req.query;
    const where = {};
    if (name) {
      where.name = { [require('sequelize').Op.like]: `%${name}%` };
    }
    if (category) {
      where.category = category;
    }

    const { count, rows } = await Product.findAndCountAll({
      where,
      limit,
      offset,
      order: [['id', 'DESC']],
    });

    res.json({
      products: rows,
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error fetching products', error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = await Product.create({ name, price, description });
    res.status(201).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error creating product', error: err.message });
  }
};
