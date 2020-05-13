const bcrypt = require('bcrypt');
const errors = require('../errors');
const logger = require('../logger');

const saltRounds = 10;

exports.crypt = hash =>
  bcrypt
    .genSalt(saltRounds)
    .then(salt => bcrypt.hash(hash, salt))
    .catch(error => {
      logger.error(error);
      throw errors.hash_error(error.message);
    });
