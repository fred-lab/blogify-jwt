const bcrypt = require('bcryptjs');

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

module.exports = {
  hash,
  authenticate,
};
