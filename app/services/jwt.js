const jwt = require('jwt-simple');
const config = require('../../config');

exports.authorizationToken = user => {
  const currentTime = Date.now() / 1000;
  const expireTime = config.common.api.tokenExpireSeconds;
  return jwt.encode(
    {
      mail: user.mail,
      type: user.type,
      exp: Math.round(currentTime + expireTime),
      iat: Math.round(currentTime)
    },
    config.common.api.jwtSecret
  );
};
exports.validate = token => jwt.decode(token, config.common.api.jwtSecret);
