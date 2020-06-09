const { User } = require('../../models');
const errors = require('../../errors');
const userService = require('../../services/users');

exports.validate = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    const tokenUser = await userService.findUserByMail(req.userToken.mail);
    if (!(user.id === tokenUser.id || tokenUser.type === 'admin')) {
      next(errors.authenticationError(`UserId ${req.params.id} doesn't have the required permission`));
      return;
    }
    next();
  } catch (err) {
    next(errors.notFound(err));
  }
};
