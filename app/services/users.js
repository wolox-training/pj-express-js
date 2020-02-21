const errors = require('../errors');
const logger = require('../logger');
const { User } = require('../models/user');

exports.createUser = params => {
  logger.info(`Create User Params: ${params}`);
  return User.create(params).catch(error => Promise.reject(errors.serverError(error)));
};
