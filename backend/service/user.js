const User = require('../models/user');

const statusCodes = require('../utils/constants').HTTP_STATUS;

const getUser = (id, res) => User.findById(id)
  .orFail()
  .then((user) => {
    res.status(statusCodes.OK).send(user);
  });

module.exports = getUser;
