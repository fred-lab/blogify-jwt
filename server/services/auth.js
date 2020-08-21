const bcrypt = require('bcryptjs');
const { sign, verify } = require('jsonwebtoken');

const { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } = process.env;

/**
 * Hash a password
 * @param {string} value
 * @param {int} salt
 */
const hash = async (value, salt = 10) => {
  try {
    return await bcrypt.hash(value, salt);
  } catch (error) {
    return false;
  }
};

/**
 * Authenticate an User against a given password
 * @param {object} user
 * @param {string} password
 */
const authenticate = async (user, password) => {
  if (!user) {
    throw new Error('Provide a valid User');
  }
  if (!user.password) {
    throw new Error('Missing "password" key');
  }

  return bcrypt.compare(password, user.password);
};

/**
 * Check if an user is a valid user to provid to the create token methods
 * @param {Object} user
 */
const checkUser = (user) => {
  if (!user) throw new Error('Provide an user');
  if (!user._id) {
    throw new Error('Provide an user with an ID key');
  }
  return true;
};

/**
 * Create an Access Token for a given User
 * @param {Object} user
 */
const createAccessToken = (user) => {
  checkUser(user);

  return sign({ id: user._id }, ACCESS_TOKEN_KEY, {
    expiresIn: '15m',
  });
};

/**
 * Create a Refresh Token for a given User
 * @param {Object} user
 */
const createRefreshToken = (user) => {
  checkUser(user);

  return sign({ id: user.id }, REFRESH_TOKEN_KEY, {
    expiresIn: '7d',
  });
};

/**
 * Send a cookie which contains the refresh token
 * Path must be equal to the route to refresh the token
 * @param {Object} res
 * @param {Object} user
 */
const sendRefreshCookie = (res, user) => {
  const { APP_ENV, NGINX_DOMAIN } = process.env;
  const domain = APP_ENV === 'prod' ? NGINX_DOMAIN : 'localhost';

  return res.cookie('jid', createRefreshToken(user), {
    httpOnly: true,
    domain,
    path: '/refresh_token',
  });
};

/**
 * Verify a Token
 * @param {string} token
 */
const verifyToken = async (token, key) => {
  if (!token)
    throw new Error(
      `Provide a valid token to verify. Token provided = ${token}`,
    );

  try {
    return verify(token, key);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Verify a Access Token
 * @param {string} token
 */
const verifyAccessToken = (token) => verifyToken(token, ACCESS_TOKEN_KEY);

/**
 * Verify a Refresh Token
 * @param {string} token
 */
const verifyRefreshToken = (token) => verifyToken(token, REFRESH_TOKEN_KEY);

module.exports = {
  hash,
  authenticate,
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  sendRefreshCookie,
};
