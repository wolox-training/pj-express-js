const jwt = require('jwt-simple');
const config = require('../../config');

exports.authorizationToken = user =>
  jwt.encode({ mail: user.mail, type: user.type }, config.common.api.jwtSecret);
exports.validate = token => jwt.decode(token, config.common.api.jwtSecret);
