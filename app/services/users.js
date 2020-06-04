const bcrypt = require('bcrypt');
const errors = require('../errors');
const logger = require('../logger');
const { User, UserAlbum } = require('../models');
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
    return {
      user_id: user.id,
      token: jwt.authorizationToken(user)
    };
  }
  logger.error('Password and mail mismatch for user:', params.mail);
  throw errors.authenticationError("The password and mail combination doesn't match");
};

exports.getUsers = async (page, limit, userType) => {
  try {
    const type = userType === 'regular' ? 'regular' : ['admin', 'regular'];
    const { count, rows } = await User.findAndCountAll({
      where: {
        type
      },
      offset: page,
      limit
    });
    return { users: rows, count, page };
  } catch (err) {
    throw errors.databaseError(err);
  }
};

exports.findUserByMail = mail =>
  User.findOne({ where: { mail } }).catch(error => {
    throw errors.databaseError(error);
  });

exports.getUserAlbums = async (userId, tokenMail) => {
  logger.info(`Index UserId: ${userId}'s Albums`);
  const user = await User.findByPk(userId);
  const tokenUser = await this.findUserByMail(tokenMail);
  if (!user) throw errors.notFound(`User with Id ${userId} not found`);
  if (!(user.id === tokenUser.id || tokenUser.type === 'admin')) {
    throw errors.authenticationError(`UserId ${userId} doesn't have the required permission`);
  }
  const userAlbums = await UserAlbum.findAll({ where: { userId } }).catch(err => {
    throw errors.databaseError(err);
  });
  return userAlbums;
};
