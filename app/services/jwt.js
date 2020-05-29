/* eslint-disable no-mixed-operators */
const jwt = require('jwt-simple');
const config = require('../../config');
const { User } = require('../models');

exports.authorizationToken = mail =>
  jwt.encode({ mail, exp: Math.round(Date.now() / 1000 + 5 * 60 * 60) }, config.common.api.jwtSecret);
exports.validate = token => jwt.decode(token, config.common.api.jwtSecret);
exports.findUserByToken = token => User.findOne({ where: { mail: this.validate(token).mail } });
