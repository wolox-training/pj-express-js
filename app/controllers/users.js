const { validationResult } = require('express-validator');
const usersService = require('../services/users');
const userMapper = require('../mappers/user');

exports.create = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors);
  }

  return userMapper
    .create(req.body)
    .then(body => usersService.createUser(body))
    .then(user => res.send(user))
    .catch(error => next(error));
};
