const { UserAlbum } = require('../models');
const logger = require('../logger');
const errors = require('../errors');

exports.buyAlbum = data =>
  UserAlbum.create(data).catch(error => {
    logger.error(error);
    throw errors.databaseError(error.message);
  });
