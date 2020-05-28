const bcrypt = require('bcrypt');
const errors = require('../errors');
const logger = require('../logger');
const { User, UserAlbum } = require('../models');
const jwt = require('./jwt');
const config = require('../../config');
const albumsService = require('../services/albums');

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

exports.index = async req => {
  const page = req.headers.page || 0;
  const type =
    (await jwt.findUserByToken(req.headers.authorization)).type === 'regular'
      ? 'regular'
      : ['admin', 'regular'];
  logger.info('Index Users with type: ', type);
  const { count, rows } = await User.findAndCountAll({
    where: {
      type
    },
    offset: page,
    limit: config.common.api.paginationLimit
  });
  return { users: rows, count, page };
};

exports.indexUserAlbums = async userId => {
  logger.info(`Index User ${userId} Albums`);
  const user = await User.findByPk(userId);
  if (!user) throw errors.notFound(`User with Id ${userId} not found`);
  const userAlbums = await UserAlbum.findAll({ where: { userId } });
  const albums = await albumsService.getAlbums({ id: userAlbums.map(ua => ua.albumId) });
  return albums;
};
