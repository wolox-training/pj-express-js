const jwt = require('../services/jwt');

exports.updateReq = (req, res, next) => {
  req.userToken = jwt.validate(req.headers.authorization);
  next();
};
