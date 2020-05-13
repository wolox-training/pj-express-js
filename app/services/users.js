const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const errors = require('../errors');
const logger = require('../logger');
const { User } = require('../models');
const config = require('../../config');

const createParams = params =>
  bcrypt
    .genSalt(10)
    .then(salt =>
      bcrypt.hash(params.password, salt).then(password => ({
        firstName: params.first_name,
        lastName: params.last_name,
        mail: params.mail,
        password
      }))
    )
    .catch(error => logger.error(error));

exports.createUser = params => {
  logger.info('Create User Params: ', params);

  return createParams(params)
    .then(sanitizedParams => User.create(sanitizedParams))
    .catch(error => {
      throw errors.databaseError(error.message);
    });
};

const validateHash = (user, hash) => bcrypt.compare(user.password, hash);
const authorizationToken = mail => jwt.encode({ mail }, config.common.api.jwtSecret);

exports.createSession = params => {
  logger.info('Create Session:', params);

  return User.findOne({ where: { mail: params.mail } })
    .then(user => validateHash(user, params.password))
    .then(result => {
      if (result) {
        return authorizationToken(params.mail);
      }
      logger.error('Password and mail mismatch for user:', params.mail);
      throw errors.authenticationError();
    })
    .catch(error => {
      throw errors.serverError(error.message);
    });
};
