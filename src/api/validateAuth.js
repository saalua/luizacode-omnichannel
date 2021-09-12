const getTokenData = require('./functions');

module.exports = (req, res, next) => {
  const authToken = req.headers['authorization'];
  const bearer = authToken.split(' ');
  const token = bearer[1];

  if (token) {
    if (getTokenData(token)) {
      req.token = token;
      next();
    } else {
      res.status(401).json('Token invalido!');
    }
  } else {
    res.status(401).send('Token não encontrado!');
  }
};
