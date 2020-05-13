const { validationResult } = require('express-validator');
const usersService = require('../services/users');

exports.create = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors);
  }
  return usersService
    .createUser(req.body)
    .then(user => res.send(user))
    .catch(error => next(error));
};

exports.sessions = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors);
  }

  return usersService
    .createSession(req.body)
    .then(authorization => {
      res.header({ Authorization: authorization });
      res.send(200);
    })
    .catch(error => next(error));
};
