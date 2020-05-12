const { validationResult } = require('express-validator');
const usersService = require('../services/users');
const userMapper = require('../mappers/user');
const bcrypt = require('../services/bcrypt');

exports.create = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors);
  }

  return bcrypt
    .crypt(req.body.password)
    .then(hash => (req.body.password = hash))
    .then(() => userMapper.create(req.body))
    .then(mapped_body => usersService.createUser(mapped_body))
    .then(user => res.send(user))
    .catch(error => next(error));
};