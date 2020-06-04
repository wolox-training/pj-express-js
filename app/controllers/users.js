const usersService = require('../services/users');
const albumsService = require('../services/albums');
const userMapper = require('../mappers/user');
const bcrypt = require('../services/bcrypt');
const jwt = require('../services/jwt');
const config = require('../../config');

exports.create = (req, res, next) =>
  bcrypt
    .crypt(req.body.password)
    .then(hash => userMapper.create(req.body, hash))
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

exports.getUsers = (req, res, next) => {
  req.userType = jwt.validate(req.headers.authorization).type;
  const page = req.headers.page || 0;
  const limit = req.headers.limit || config.common.api.paginationLimit;
  return usersService
    .getUsers(page, limit, req.userType)
    .then(users => res.send(users))
    .catch(error => next(error));
};

exports.invalidateAll = (req, res, next) => {
  usersService
    .invalidateAll(jwt.validate(req.headers.authorization))
    .then(() => res.send(200))
    .catch(error => next(error));
};

exports.getUserAlbums = (req, res, next) => {
  req.userToken = jwt.validate(req.headers.authorization);
  return usersService
    .getUserAlbums(req.params.id, req.userToken.mail)
    .then(userAlbums => albumsService.albumsBy({ id: userAlbums.map(ua => ua.albumId) }))
    .then(albums => res.send(albums))
    .catch(error => next(error));
};
