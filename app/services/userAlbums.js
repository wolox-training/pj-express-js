const { UserAlbum } = require('../models');
const logger = require('../logger');
const errors = require('../errors');

exports.buyAlbum = async data => {
  const userAlbum = await UserAlbum.findOne({ where: { userId: data.userId, albumId: data.albumId } });
  if (userAlbum) {
    throw errors.conflictError('User has already purchased this album.');
  } else {
    return UserAlbum.create(data).catch(error => {
      logger.error(error);
      throw errors.databaseError(error.message);
    });
  }
};

exports.getUserAlbums = userId =>
  UserAlbum.findAll({ where: { userId } }).catch(err => {
    throw errors.databaseError(err);
  });
