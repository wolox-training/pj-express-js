exports.create = (params, hash) => ({
  firstName: params.first_name,
  lastName: params.last_name,
  mail: params.mail,
  password: hash,
  type: params.type
});
