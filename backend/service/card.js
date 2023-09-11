const { HTTP_STATUS_OK } = require('http2').constants;

const Card = require('../models/card');
const HttpError = require('../error/http-error');

const updateLikeCard = (id, update, options, res) => Card.findByIdAndUpdate(id, update, options)
  .orFail(HttpError.NotFoundError('Карточка не найдена'))
  .then((card) => {
    res.status(HTTP_STATUS_OK).send(card);
  });

module.exports = updateLikeCard;
