const { User } = require('../../models/index');
const errors = require('../../errors');

exports.validate = (req, res, next) => {
  User.findByPk(req.body.user_id).then(user => {
    if (user.type !== 'admin') {
      next(errors.authenticationError('User is not an Admin'));
    }
    next();
  });
};
