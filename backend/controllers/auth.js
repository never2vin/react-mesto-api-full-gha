const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const HttpError = require('../error/http-error');

const MONGO_DUPLICATE_KEY_ERROR = 11000;
const SALT_ROUNDS = 10;
const { JWT_SECRET = 'SECRET_KEY' } = process.env;

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, SALT_ROUNDS)
    .then((hash) => User.create({ ...req.body, password: hash }))
    .then((user) => res.status(HTTP_STATUS_CREATED).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
    }))
    .catch((error) => {
      if (error.code === MONGO_DUPLICATE_KEY_ERROR) {
        next(HttpError.ConflictError('Такой пользователь уже есть'));
        return;
      }

      next(error);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .orFail(HttpError.UnauthorizedError())
    .then((user) => Promise.all([user, bcrypt.compare(password, user.password)]))
    .then(([user, isEqual]) => {
      if (!isEqual) {
        throw HttpError.UnauthorizedError();
      }

      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.status(HTTP_STATUS_OK).send({ token });
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
};
