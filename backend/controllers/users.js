const { HTTP_STATUS_OK } = require('http2').constants;

const User = require('../models/user');
const getUser = require('../service/user');

const getUsers = (req, res, next) => User.find({})
  .then((users) => {
    res.status(HTTP_STATUS_OK).send(users);
  })
  .catch(next);

const getCurrentUser = (req, res, next) => getUser(req.user._id, res)
  .catch(next);

const getUserById = (req, res, next) => getUser(req.params.userId, res)
  .catch(next);

const updateUser = (req, res, next) => User.findByIdAndUpdate(
  req.user._id,
  req.body,
  { new: true, runValidators: true },
)
  .then((user) => {
    res.status(HTTP_STATUS_OK).send(user);
  })
  .catch(next);

module.exports = {
  getUsers,
  getCurrentUser,
  getUserById,
  updateUser,
};
