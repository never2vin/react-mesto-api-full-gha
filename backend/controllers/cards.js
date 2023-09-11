const Card = require('../models/card');
const updateLikeCard = require('../service/card');

const statusCodes = require('../utils/constants').HTTP_STATUS;

const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

const getCards = (req, res, next) => Card.find({})
  // .populate(['owner', 'likes'])
  .then((cards) => {
    res.status(statusCodes.OK).send(cards);
  })
  .catch(next);

const createCard = (req, res, next) => Card.create({ owner: req.user._id, ...req.body })
  .then((card) => {
    res.status(statusCodes.CREATED).send(card);
  })
  .catch((error) => {
    console.log(error);

    if (error.name === 'ValidationError') {
      next(new BadRequestError(`${Object.values(error.errors).map((err) => err.message).join(', ')}`));
      return;
    }

    next(error);
  });

const deleteCard = (req, res, next) => Card.findById(req.params.cardId)
  .orFail()
  .then((card) => {
    if (card.owner._id.toString() !== req.user._id) {
      throw new ForbiddenError('Можно удалять только собственные карточки');
    }

    return card.deleteOne();
  })
  .then(() => res.status(statusCodes.OK).send({ message: 'Карточка удалена' }))
  .catch((error) => {
    console.log(error);

    if (error.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
      return;
    }

    if (error.name === 'DocumentNotFoundError') {
      next(new NotFoundError('Карточка не найдена'));
      return;
    }

    next(error);
  });

const likeCard = (req, res, next) => updateLikeCard(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
  res,
)
  .catch((error) => {
    console.log(error);

    if (error.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
      return;
    }

    if (error.name === 'DocumentNotFoundError') {
      next(new NotFoundError('Карточка не найдена'));
      return;
    }

    next(error);
  });

const dislikeCard = (req, res, next) => updateLikeCard(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
  res,
)
  .catch((error) => {
    console.log(error);

    if (error.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
      return;
    }

    if (error.name === 'DocumentNotFoundError') {
      next(new NotFoundError('Карточка не найдена'));
      return;
    }

    next(error);
  });

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
