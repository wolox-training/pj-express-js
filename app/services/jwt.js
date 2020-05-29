const jwt = require('jwt-simple');
const config = require('../../config');

exports.authorizationToken = mail => jwt.encode({ mail }, config.common.api.jwtSecret);
exports.validate = token => jwt.decode(token, config.common.api.jwtSecret);
