const bcrypt = require('bcrypt');
const errors = require('../errors');
const logger = require('../logger');
const { User } = require('../models');
const jwt = require('./jwt');
const config = require('../../config');
const mailer = require('./mailer');

const createUser = data => {
  logger.info('Create User: ', data);

  return User.create(data)
    .then(user => {
      mailer.sendMail(user);
      return user;
    })
    .catch(error => {
      logger.error(error);
      throw errors.databaseError(error.message);
    });
};

const validateHash = (user, hash) => bcrypt.compare(user.password, hash);

const createSession = async params => {
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

const index = async req => {
  logger.info('Index Users with: ', req);
  const page = req.headers.page || 0;
  const type =
    (await jwt.findUserByToken(req.headers.authorization)).type === 'regular'
      ? 'regular'
      : ['admin', 'regular'];
  const { count, rows } = await User.findAndCountAll({
    where: {
      type
    },
    offset: page,
    limit: config.common.api.paginationLimit
  });
  return { users: rows, count, page };
};

const findUserByMail = mail => User.findOne({ where: { mail } });

const invalidateAll = token => {
  try {
    return findUserByMail(jwt.validate(token).mail).then(user => {
      user.tokenEmitDate = Date.now();
      user.save();
      return user;
    });
  } catch (err) {
    throw errors.databaseError(err);
  }
};

module.exports = { createUser, createSession, index, findUserByMail, invalidateAll };
