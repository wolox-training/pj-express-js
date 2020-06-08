const jwt = require('../../services/jwt');
const errors = require('../../errors');

exports.validate = (req, res, next) => {
  try {
    jwt.decode(req.headers.authorization);
    next();
  } catch (err) {
    next(errors.authenticationError(err));
  }
};
