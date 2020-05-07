const { validationResult } = require('express-validator');
const usersService = require('../services/users');

exports.create = (req, res, next) => {
  console.log('hello');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('there is errors');
    return next(errors);
  }
  console.log('no errors');
  return usersService
    .createUser(req.body)
    .then(user => res.send(user))
    .catch(error => next(error));
};
