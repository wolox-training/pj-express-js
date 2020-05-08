const bcrypt = require('bcrypt');
const errors = require('../errors');
const logger = require('../logger');
const { User } = require('../models');

exports.createUser = data => {
  logger.info('Create User: ', data);

  return User.create(data).catch(error => {
    throw errors.databaseError(error.message);
  });
};

exports.validateHash = (user, hash) => bcrypt.compare(user.password, hash);
