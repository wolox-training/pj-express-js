const bcrypt = require('bcrypt');
const errors = require('../errors');
const logger = require('../logger');
const { User } = require('../models/user');

const createParams = params => {
  bcrypt.genSalt(10).then(salt => ({
    firstName: params.firstName,
    lastName: params.lastName,
    username: params.username,
    password: bcrypt.hash(params.password, salt)
  }));
};

exports.createUser = params => {
  logger.info(`Create User Params: ${params}`);
  return User.create(createParams(params)).catch(error => Promise.reject(errors.databaseError(error)));
};

exports.validateHash = (user, hash) => {
  bcrypt.compare(user.password, hash);
};
