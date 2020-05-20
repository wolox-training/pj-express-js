const { User } = require('../../models/index');
const errors = require('../../errors');

const findUser = userId => User.findByPk(userId).then(user => user);

exports.validateHeaders = (req, res, next) => {
  findUser(req.headers.user_id).then(user => {
    if (!user) {
      next(errors.notFound('User not found'));
    }
    next();
  });
};

exports.validateBody = (req, res, next) => {
  findUser(req.body.user_id).then(user => {
    if (!user) {
      next(errors.notFound('User not found'));
    }
    next();
  });
};
