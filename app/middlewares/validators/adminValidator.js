const { User } = require('../../models/index');
const errors = require('../../errors');
const jwt = require('../../services/jwt');

exports.validateAdmin = (req, res, next) => {
  jwt.findUserByToken(req.headers.authorization).then(user => {
    if (user.type !== 'admin') {
      next(errors.authenticationError('User is not an Admin'));
    }
    next();
  });
};

exports.create = (req, res, next) => {
  User.findByPk(req.body.user_id).then(user => {
    if (!user) next(errors.notFound(`User with ID ${req.body.user_id} not found`));
    next();
  });
};
