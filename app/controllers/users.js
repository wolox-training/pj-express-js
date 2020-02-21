const { validationResult } = require('express-validator');
const usersService = require('../services/users');

function create(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors);
  }

  return usersService
    .createUser(req.body)
    .then(user => res.send(user))
    .catch(error => next(error));
}

export { create };
