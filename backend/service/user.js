const { HTTP_STATUS_OK } = require('http2').constants;

const User = require('../models/user');
const HttpError = require('../error/http-error');

const getUser = (id, res) => User.findById(id)
  .orFail(HttpError.NotFoundError('Пользователь не найден'))
  .then((user) => {
    res.status(HTTP_STATUS_OK).send(user);
  });

module.exports = getUser;
