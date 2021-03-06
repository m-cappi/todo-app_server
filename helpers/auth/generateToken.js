const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const token = jwt.sign(
    {
      userId: user.userId,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      // expires in 30 days
      expiresIn: 60 * 60 * 24 * 30
    }
  );

  return token;
};

module.exports = { generateToken };
