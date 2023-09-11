const router = require('express').Router();
const { errors } = require('celebrate');
const authRouter = require('./auth');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

const auth = require('../middlewares/auth');
const errorHandler = require('../middlewares/error-handler');
const { requestLogger, errorLogger } = require('../middlewares/logger');

const HttpError = require('../error/http-error');

router.use(requestLogger);

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('/', authRouter);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use((req, res, next) => {
  next(HttpError.NotFoundError('Ресурс не найден. Проверьте URL и метод запроса'));
});

router.use(errorLogger);
router.use(errors());
router.use(errorHandler);

module.exports = router;
