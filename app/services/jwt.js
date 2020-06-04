const jwt = require('jwt-simple');
const config = require('../../config');
const { User } = require('../models');

exports.authorizationToken = mail => {
  const currentTime = Date.now() / 1000;
  const expireTime = config.common.api.tokenExpireHours * 60 * 60;
  return jwt.encode({ mail, exp: Math.round(currentTime + expireTime) }, config.common.api.jwtSecret);
};
exports.validate = token => jwt.decode(token, config.common.api.jwtSecret);
exports.findUserByToken = token => User.findOne({ where: { mail: this.validate(token).mail } });
