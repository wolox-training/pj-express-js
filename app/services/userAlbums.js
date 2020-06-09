const { UserAlbum } = require('../models');
const logger = require('../logger');
const errors = require('../errors');

exports.buyAlbum = data =>
  UserAlbum.create(data).catch(error => {
    logger.error(error);
    throw errors.conflictError(error.message);
  });

exports.getUserAlbums = userId =>
  UserAlbum.findAll({ where: { userId } }).catch(err => {
    throw errors.databaseError(err);
  });
