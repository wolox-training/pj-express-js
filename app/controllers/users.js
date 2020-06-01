const usersService = require('../services/users');
const userMapper = require('../mappers/user');
const bcrypt = require('../services/bcrypt');

exports.create = (req, res, next) =>
  bcrypt
    .crypt(req.body.password)
    .then(hash => (req.body.password = hash))
    .then(() => userMapper.create(req.body))
    .then(mapped_body => usersService.createUser(mapped_body))
    .then(user => res.send(user))
    .catch(error => next(error));

exports.sessions = (req, res, next) =>
  usersService
    .createSession(req.body)
    .then(authorization => {
      res.header({ Authorization: authorization.token });
      res.send({ user_id: authorization.user_id });
    })
    .catch(error => next(error));

exports.index = (req, res, next) =>
  usersService
    .index(req)
    .then(users => res.send(users))
    .catch(error => next(error));

exports.invalidateAll = (req, res, next) =>
  usersService
    .invalidateAll(req.headers.authorization)
    .then(() => res.send(200))
    .catch(error => next(error));
