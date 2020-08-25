const { verifyAccessToken } = require('../services/auth');

/**
 * Check if a request is authenticated with a valid JWT Access Token
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const isAuthenticate = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ message: 'Not Authenticated' });
    throw new Error('Not Authenticated : missing "Authorization" header');
  }

  const token = authorization.split(' ')[1];

  if (!token || token === '') {
    res.status(401).json({ message: 'Not Authenticated' });
    throw new Error(
      `Not Authenticated : token is missing. Value given : ${token}`,
    );
  }

  try {
    verifyAccessToken(token);
  } catch (error) {
    console.log('*', error);
    res.status(401).json({ message: 'Not Authenticated' });
    throw new Error(`Not Authenticated : ${error}`);
  }
  next();
};

module.exports = {
  isAuthenticate,
};
