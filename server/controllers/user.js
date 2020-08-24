const express = require('express');
const User = require('../models/user');
const {
  authenticate,
  createAccessToken,
  verifyRefreshToken,
  sendRefreshCookie,
} = require('../services/auth');
const { isAuthenticate } = require('../middleware/auth');

const router = express.Router();

/**
 * Create an User
 */
router.post('/create', isAuthenticate, async (req, res) => {
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
    return res.status(201).json({ message: response });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

/**
 * Log an user
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('request : ', email, password);
  try {
    const user = await User.findOne({ email });
    const isAuth = await authenticate(user, password);

    if (isAuth) {
      // Send JWT Access Token via an HTTP cookie
      sendRefreshCookie(res, user);
      console.log(user);
      // Send JWT Access Token
      return res.json({
        message: 'log in',
        access_token: createAccessToken(user),
        isAuth,
        role: user.role,
        firstname: user.username,
        lastname: user.lastname,
        email: user.email,
      });
    }
    return res.status(401).json({ message: 'Bad Credentials' });
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ message: 'Not authenticated' });
  }
});

/**
 * Log out an user
 */
router.get('/logout', isAuthenticate, (req, res) => {
  return res.json({ message: 'log out' });
});

/**
 * A route to refresh the access token.
 * The client must send a cookie with a key nammed 'jid' and the content must be the refresh token
 */
router.post('/refresh_token', isAuthenticate, async (req, res) => {
  if (!req.cookies) {
    return res.json({
      message: 'Cookies are missing',
      access_token: '',
    });
  }
  // Extract the refresh token
  const refreshToken = req.cookies.jid;

  if (!refreshToken)
    return res.json({ message: 'Token is missing', access_token: '' });

  let payload = null;
  try {
    // Check if the refresh token is valid
    payload = await verifyRefreshToken(refreshToken);
  } catch (error) {
    console.error('err ', error);
    return res.json({ message: 'Authentication expired', access_token: '' });
  }

  if (!payload) {
    return res.json({ message: 'Token is invalid', access_token: '' });
  }

  // Refresh token is valid. Find the user to refresh his acess token
  try {
    const user = await User.findById(payload.id);
    if (!user) return res.json({ message: 'User not found', access_token: '' });

    // Send a new refresh token via an HTTP Only cookie
    sendRefreshCookie(res, user);
    // Refresh and send a new JWT Access Token
    return res.status(200).json({
      message: 'Acces token refreshed',
      access_token: createAccessToken(user),
    });
  } catch (error) {
    console.error(error);
    res.json({ message: 'User not found', access_token: '' });
  }
});

module.exports = router;
