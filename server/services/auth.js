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
  if (!user.hasOwnProperty.call('password')) {
    throw new Error('Missing "password" key');
  }

  return bcrypt.compare(password, user.password);
};

/**
 * Create an Access Token for a given User
 * @param {Object} user
 */
const createAccessToken = (user) => {
  if (!user) throw new Error('Provide an user');
  if (!user.hasOwnProperty.call('id')) {
    throw new Error('Provide an user with an ID key');
  }

  return sign({ id: user.id }, ACCESS_TOKEN_KEY, {
    expiresIn: '15m',
  });
};

/**
 * Create a Refresh Token for a given User
 * @param {Object} user
 */
const createRefreshToken = (user) => {
  if (!user) throw new Error('Provide an user');
  if (!user.hasOwnProperty.call('id')) {
    throw new Error('Provide an user with an ID key');
  }

  return sign({ id: user.id }, REFRESH_TOKEN_KEY, {
    expiresIn: '7d',
  });
};

/**
 * Verify a Token
 * @param {string} token
 */
const verifyToken = (token, key) => {
  if (!token) throw new Error('Provide a token to verify');
  return verify(token, key);
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
};
