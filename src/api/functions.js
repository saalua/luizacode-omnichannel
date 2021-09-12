require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = (token) => {
  const JWTSecret = process.env.JWTSecret;

  return jwt.verify(token, JWTSecret, (err, data) => {
    if (err) {
      return null;
    }

    return data;
  });
};
