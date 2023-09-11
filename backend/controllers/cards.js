const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;

const Card = require('../models/card');
const updateLikeCard = require('../service/card');

const HttpError = require('../error/http-error');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => {
    res.status(HTTP_STATUS_OK).send(cards);
  })
  .catch(next);

const createCard = (req, res, next) => Card.create({ owner: req.user._id, ...req.body })
  .then((card) => {
    res.status(HTTP_STATUS_CREATED).send(card);
  })
  .catch(next);

const deleteCard = (req, res, next) => Card.findById(req.params.cardId)
  .orFail(HttpError.NotFoundError('Карточка не найдена'))
  .then((card) => {
    if (card.owner._id.toString() !== req.user._id) {
      throw HttpError.NotFoundError('Можно удалять только собственные карточки');
    }

    return card.deleteOne();
  })
  .then(() => res.status(HTTP_STATUS_OK).send({ message: 'Карточка удалена' }))
  .catch(next);

const likeCard = (req, res, next) => updateLikeCard(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
  res,
)
  .catch(next);

const dislikeCard = (req, res, next) => updateLikeCard(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
  res,
)
  .catch(next);

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
