const bcrypt = require('../services/bcrypt');

module.exports.create = async function create(params) {
  return {
    firstName: params.first_name,
    lastName: params.last_name,
    mail: params.mail,
    password: await bcrypt.crypt(params.password)
  };
};
