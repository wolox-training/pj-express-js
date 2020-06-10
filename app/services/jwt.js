const jwt = require('jwt-simple');
const config = require('../../config');

exports.authorizationToken = user => {
  const currentTime = Date.now() / 1000;
  const expireTime = Number(config.common.api.tokenExpireSeconds);
  return jwt.encode(
    { mail: user.mail, type: user.type, exp: Math.floor(currentTime + expireTime) },
    config.common.api.jwtSecret
  );
};
exports.decode = token => jwt.decode(token, config.common.api.jwtSecret);
