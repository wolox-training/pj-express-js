const errors = require('../errors');
const logger = require('../logger');
const { User } = require('../models');

exports.createAdmin = data => {
  logger.info('Create Admin: ', data);

  return User.upsert(data, { returning: true })
    .then(result => result[0])
    .catch(error => {
      logger.error(error);
      throw errors.databaseError(error.message);
    });
};
