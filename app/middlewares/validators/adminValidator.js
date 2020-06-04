const errors = require('../../errors');
const jwt = require('../../services/jwt');
const userService = require('../../services/users');

exports.validate = async (req, res, next) => {
  try {
    const token = jwt.validate(req.headers.authorization);
    const user = await userService.findUserByMail(token.mail);
    if (user.tokenEmitDate / 1000 > token.iat) {
      next(errors.authenticationError('User Token has expired.'));
      return;
    }
    if (user.type !== 'admin') {
      next(errors.authenticationError("User doesn't have the required Admin Permissions"));
      return;
    }
    next();
  } catch (err) {
    next(errors.authenticationError(err));
  }
};
