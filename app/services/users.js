const bcrypt = require('bcrypt');
const errors = require('../errors');
const logger = require('../logger');
const { User } = require('../models');
const jwt = require('./jwt');

exports.createUser = data => {
  logger.info('Create User: ', data);

  return User.create(data).catch(error => {
    logger.error(error);
    throw errors.databaseError(error.message);
  });
};

const validateHash = (user, hash) => bcrypt.compare(user.password, hash);

exports.createSession = params => {
  logger.info('Create Session:', params);
  const response = {};
  return User.findOne({ where: { mail: params.mail } })
    .then(user => {
      response.user_id = user.id;
      return validateHash(user, params.password);
    })
    .then(result => {
      if (result) {
        response.token = jwt.authorizationToken(params.mail);
        return response;
      }
      logger.error('Password and mail mismatch for user:', params.mail);
      throw errors.authenticationError("The password and mail combination doesn't match");
    })
    .catch(error => {
      throw errors.authenticationError(error.message);
    });
};
