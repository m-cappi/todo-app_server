const { generateToken } = require('../helpers/auth/generateToken');
const { CompareHash } = require('../helpers/auth/hash');
const db = require('../models/index');

const { User } = db.sequelize.models;

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    const isMatch = user && (await CompareHash(password, user.password));

    if (isMatch) {
      const token = generateToken(user);
      res.status(200).json({ token, userId: user.userId, email: user.email });
    } else {
      res.status(401);
      throw new Error('Invalid credentials!');
    }
  } catch (err) {
    next(err);
  }
};

const Register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      res.status(409);
      throw new Error('This email is already registered!');
    }

    const newUser = await User.create(
      {
        email,
        password
      },
      {
        validation: true,
        fields: ['email', 'password']
      }
    );

    const token = generateToken(newUser);

    res.status(201).json({ token, userId: newUser.userId, email: newUser.email });
  } catch (err) {
    next(err);
  }
};

module.exports = { Login, Register };
