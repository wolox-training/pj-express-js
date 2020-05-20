const { User } = require('../models/index');
const jwt = require('../services/jwt');
const errors = require('../errors');

exports.validate = (req, res, next) => {
  User.findByPk(req.headers.user_id).then(user => {
    if (jwt.authorizationToken(user.dataValues.mail) !== req.headers.authorization) {
      next(errors.authenticationError('Invalid authentication token'));
    }
    next();
  });
};
