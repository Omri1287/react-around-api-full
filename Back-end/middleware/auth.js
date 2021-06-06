// middleware/auth.js

const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../middleware/errors/UnauthorizedError');


module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Authorization Required');

  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new UnauthorizedError('Authorization Required');

  }

  req.user = payload; // assigning the payload to the request object

  next(); // sending the request to the next middleware
}; 