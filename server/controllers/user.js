const express = require('express');
const User = require('../models/user');
const { authenticate } = require('../services/auth');

const router = express.Router();

/**
 * Create an User
 */
router.post('/create', async (req, res) => {
  const { username, lastname, password, email, role } = req.body;

  const user = new User({
    username,
    lastname,
    password,
    email,
    role,
  });

  try {
    const response = await user.save();
    res.status(201).json({ message: response });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * Log an user
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const isAuth = await authenticate(user, password);

    if (isAuth) {
      res.status(200).json({ message: 'log in' });
    }
    res.status(401).json({ message: 'Bad Credentials' });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

/**
 * Log out an user
 */
router.get('/logout', (req, res) => {
  res.json({ message: 'log out' });
});

module.exports = router;
