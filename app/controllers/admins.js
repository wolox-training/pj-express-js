const adminsService = require('../services/admins');
const userMapper = require('../mappers/user');
const bcrypt = require('../services/bcrypt');

exports.create = (req, res, next) =>
  bcrypt
    .crypt(req.body.password)
    .then(hash => (req.body.password = hash))
    .then(() => userMapper.create(req.body))
    .then(mappedBody => adminsService.createAdmin(mappedBody))
    .then(response => res.send(response))
    .catch(error => next(error));
