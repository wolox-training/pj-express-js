const errors = require('../../errors');
const jwt = require('../../services/jwt');

exports.validateAdmin = (req, res, next) => {
  try {
    if (jwt.decode(req.headers.authorization).type !== 'admin') {
      next(errors.authenticationError('User is not an Admin'));
      return;
    }
    next();
  } catch (err) {
    next(errors.authenticationError(err));
  }
};
