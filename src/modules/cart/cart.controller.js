exports.checkout = async (req, res) => {
  // In a real app, you would create a payment session and redirect to a payment gateway
  // For now, redirect to a mock payment page
  res.redirect(302, '/payment');
};
const { Cart } = require('../../models/cart.model');
const { Product } = require('../../models/product.model');

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [Product],
    });
    res.json(cartItems);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error fetching cart', error: err.message });
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const cartItem = await Cart.findOne({ where: { id, userId } });
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    await cartItem.destroy();
    res.json({ message: 'Cart item deleted successfully' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error deleting cart item', error: err.message });
  }
};
