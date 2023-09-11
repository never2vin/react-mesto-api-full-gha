const Card = require('../models/card');

const ApiError = require('../errors/api-error');

const statusCodes = require('../utils/constants').HTTP_STATUS;

const updateLikeCard = (id, update, options, res) => Card.findByIdAndUpdate(id, update, options)
  .orFail(ApiError.NotFoundError('Карточка не найдена'))
  .then((card) => {
    res.status(statusCodes.OK).send(card);
  });

module.exports = updateLikeCard;
