const bcrypt = require('bcrypt');
const errors = require('../errors');
const logger = require('../logger');
const { User } = require('../models');

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

exports.validateHash = (user, hash) => bcrypt.compare(user.password, hash);
