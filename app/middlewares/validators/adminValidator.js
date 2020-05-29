const errors = require('../../errors');
const jwt = require('../../services/jwt');
const userService = require('../../services/users');

exports.validateAdmin = (req, res, next) => {
  try {
    userService.findUserByMail(jwt.validate(req.headers.authorization).mail).then(user => {
      if (user.type !== 'admin') {
        next(errors.authenticationError('User is not an Admin'));
      }
      next();
    });
  } catch (err) {
    next(errors.authenticationError(err));
  }
};
