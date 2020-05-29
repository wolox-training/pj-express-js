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

exports.createSession = async params => {
  logger.info('Create Session:', params);
  const user = await User.findOne({ where: { mail: params.mail } });
  if (!user) {
    throw errors.notFound(`User ${params.mail} doesn't exist`);
  }
  const result = await validateHash(user.dataValues, params.password);
  if (result) {
    return { user_id: user.id, token: jwt.authorizationToken(params.mail) };
  }
  logger.error('Password and mail mismatch for user:', params.mail);
  throw errors.authenticationError("The password and mail combination doesn't match");
};

exports.findUserByMail = mail => User.findOne({ where: { mail } });
