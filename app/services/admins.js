const errors = require('../errors');
const logger = require('../logger');
const { User } = require('../models');

exports.createAdmin = data => {
  logger.info('Create Admin: ', data);

  return User.findByPk(data.user_id)
    .then(user => {
      user.type = 'admin';
      user.save();
      return user.dataValues;
    })
    .catch(error => {
      logger.error(error);
      throw errors.databaseError(error.message);
    });
};
