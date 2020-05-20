const { User } = require('../models/index');
const errors = require('../errors');

exports.validate = (req, res, next) => {
  User.findByPk(req.headers.user_id).then(user => {
    if (!user) {
      next(errors.notFound('User not found'));
    }
    next();
  });
};
