const jwt = require('../../services/jwt');
const errors = require('../../errors');
const userService = require('../../services/users');

exports.validate = async (req, res, next) => {
  try {
    const token = jwt.validate(req.headers.authorization);
    const user = await userService.findUserByMail(token.mail);
    if (user.tokenEmitDate / 1000 <= token.iat) {
      next();
      return;
    }
    next(errors.authenticationError('User Token has expired.'));
  } catch (err) {
    next(errors.authenticationError(err));
  }
};
