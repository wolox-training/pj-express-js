const bcrypt = require('bcrypt');
const errors = require('../errors');

exports.crypt = hash =>
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(hash, salt))
    .catch(error => {
      throw errors.hash_error(error.message);
    });
