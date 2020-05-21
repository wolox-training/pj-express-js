const jwt = require('../../services/jwt');
const errors = require('../../errors');

exports.validate = (req, res, next) => {
  try {
    jwt.validate(req.headers.authorization);
    next();
  } catch (err) {
    next(errors.authenticationError(err));
  }
};
