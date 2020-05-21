const jwt = require('jwt-simple');
const config = require('../../config');
const { User } = require('../models');

exports.authorizationToken = mail => jwt.encode({ mail }, config.common.api.jwtSecret);
exports.validate = token => jwt.decode(token, config.common.api.jwtSecret);
exports.findUserByToken = token => User.findOne({ where: { mail: this.validate(token).mail } });
