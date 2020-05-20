const { User } = require('../../models/index');
const jwt = require('../../services/jwt');
const errors = require('../../errors');

const findUser = userId => User.findByPk(userId).then(user => user);
const validToken = (userMail, token) => jwt.authorizationToken(userMail) === token;

exports.validateHeaders = (req, res, next) => {
  findUser(req.headers.user_id).then(user => {
    if (!validToken(user.dataValues.mail, req.headers.authorization)) {
      next(errors.authenticationError('Invalid authentication token'));
    }
    next();
  });
};

exports.validateBody = (req, res, next) => {
  findUser(req.body.user_id).then(user => {
    if (!validToken(user.dataValues.mail, req.headers.authorization)) {
      next(errors.authenticationError('Invalid authentication token'));
    }
    next();
  });
};
