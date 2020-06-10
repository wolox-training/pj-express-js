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
      req.user = user.dataValues;
      next();
    })
    .catch(err => {
      next(errors.notFound(err));
    });
};
