const {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = require('http2').constants;

const MongooseError = require('mongoose').Error;
const HttpError = require('../error/http-error');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.log(err);

  const { status, message } = err;

  if (err instanceof HttpError) {
    return res.status(status).send({ message });
  }

  if (err instanceof MongooseError.CastError) {
    return res
      .status(HTTP_STATUS_BAD_REQUEST)
      .send({ message: 'Переданы некорректные данные' });
  }

  if (err instanceof MongooseError.ValidationError) {
    return res
      .status(HTTP_STATUS_BAD_REQUEST)
      .send(`${Object.values(err.errors).map((error) => error.message).join(', ')}`);
  }

  return res
    .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
    .send({ message: 'На сервере произошла ошибка' });
};

module.exports = errorHandler;
