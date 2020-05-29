exports.create = params => ({
  firstName: params.first_name,
  lastName: params.last_name,
  mail: params.mail,
  password: params.password,
  type: params.type
});
