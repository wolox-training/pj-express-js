const errors = require('../../errors');
const jwt = require('../../services/jwt');

exports.validateAdmin = (req, res, next) => {
  try {
    if (jwt.validate(req.headers.authorization).type !== 'admin') {
      next(errors.authenticationError('User is not an Admin'));
    }
    next();
  } catch (err) {
    next(errors.authenticationError(err));
  }
};
