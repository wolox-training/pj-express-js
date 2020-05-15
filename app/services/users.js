const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const errors = require('../errors');
const logger = require('../logger');
const { User } = require('../models');
const config = require('../../config');

exports.createUser = data => {
  logger.info('Create User: ', data);

  return User.create(data).catch(error => {
    logger.error(error);
    throw errors.databaseError(error.message);
  });
};

const validateHash = (user, hash) => bcrypt.compare(user.password, hash);
const authorizationToken = mail => jwt.encode({ mail }, config.common.api.jwtSecret);

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
        response.token = authorizationToken(params.mail);
        return response;
      }
      logger.error('Password and mail mismatch for user:', params.mail);
      throw errors.authenticationError();
    })
    .catch(error => {
      throw errors.authenticationError(error.message);
    });
};
