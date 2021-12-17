const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.sendStatus(401);
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        res.sendStatus(401);
      } else {
        const { userId, email } = data;
        req.user = { userId, email };
        next();
      }
    });
  }
};

module.exports = { isAuthenticated };
