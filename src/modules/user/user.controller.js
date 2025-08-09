const { User } = require('../../models/user.model'); // Make sure this path is correct
const bcrypt = require('bcryptjs'); // add bcryptjs

exports.signup = async (req, res) => {
  const { first_name, last_name, email, password, confirm_password, userType } =
    req.body;
    if (!email || !password || !userType) {
    return res
      .status(400)
      .json({ message: 'Email and password are required.' });
  }
  if (password !== confirm_password) {
    return res
      .status(400)
      .json({ message: 'password and confirm-password mismatches.' });
  }
  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'User already exists.' });
    }
    // hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ first_name, last_name, email, password: hashedPassword, userType: userType || 'Normal' });
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error registering user', error: err.message });
  }
};

const { generateToken } = require('../../middlewares/auth');

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    // compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const token = generateToken({ id: user.id, email: user.email });
    res.json({ message: 'Signin successful.', token });
  } catch (err) {
    res.status(500).json({ message: 'Error signing in', error: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    // In a real app, send a reset email here
    res.json({ message: 'Password reset link sent (mock).' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error processing request', error: err.message });
  }
};

// If you see "SQLITE_ERROR: table Users has no column named first_name",
// it means your database schema is out of sync with your model definition.
// To fix this, you need to re-sync your database tables with the model.
// In development, you can use { force: true } with sync to drop and recreate tables:

// In your main app file (not here), ensure you have:
//
// sequelize.sync({ force: true })
//
// This will drop and recreate all tables based on your latest model definitions.
// WARNING: This will delete all existing data in those tables.
//
// After syncing, the error will be resolved and you can use first_name, last_name, etc.
