const jwt = require('../services/jwt');

exports.updateReq = (req, res, next) => {
  req.userToken = jwt.decode(req.headers.authorization);
  next();
};
