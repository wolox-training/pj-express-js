const jwt = require('../../services/jwt');
const errors = require('../../errors');
const usersService = require('../../services/users');

exports.validate = (req, res, next) => {
  try {
    const token = jwt.decode(req.headers.authorization);
    req.userToken = token;
  } catch (err) {
    next(errors.authenticationError(err));
    return;
  }
  usersService
    .findUserByMail(req.userToken.mail)
    .then(user => {
      if (user.tokenEmitDate / 1000 <= req.userToken.iat) {
        req.user = user.dataValues;
        next();
        return;
      }
      next(errors.authenticationError('User Token has expired.'));
    })
    .catch(err => {
      next(errors.notFound(err));
    });
};
