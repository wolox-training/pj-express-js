const { validationResult } = require('express-validator');
const adminsService = require('../services/admins');

exports.create = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors);
  }

  return adminsService
    .createAdmin(req.body)
    .then(response => res.send(response))
    .catch(error => next(error));
};
