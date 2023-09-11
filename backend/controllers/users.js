const User = require('../models/user');
const getUser = require('../service/user');

const statusCodes = require('../utils/constants').HTTP_STATUS;

const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');

const getUsers = (req, res, next) => User.find({})
  .then((users) => {
    res.status(statusCodes.OK).send(users);
  })
  .catch(next);

const getCurrentUser = (req, res, next) => getUser(req.user._id, res)
  .catch(next);

const getUserById = (req, res, next) => getUser(req.params.userId, res)
  .catch((error) => {
    console.log(error);

    if (error.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
      return;
    }

    if (error.name === 'DocumentNotFoundError') {
      next(new NotFoundError('Пользователь не найден'));
      return;
    }

    next(error);
  });

const updateUser = (req, res, next) => User.findByIdAndUpdate(
  req.user._id,
  req.body,
  { new: true, runValidators: true },
)
  .then((user) => {
    res.status(statusCodes.OK).send(user);
  })
  .catch((error) => {
    console.log(error);

    if (error.name === 'ValidationError') {
      next(new BadRequestError(`${Object.values(error.errors).map((err) => err.message).join(', ')}`));
      return;
    }

    next(error);
  });

module.exports = {
  getUsers,
  getCurrentUser,
  getUserById,
  updateUser,
};
