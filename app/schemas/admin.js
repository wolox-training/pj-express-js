exports.create = {
  user_id: {
    in: ['body'],
    exists: true,
    errorMessage: 'user_id is mandatory'
  },
  authorization: {
    in: ['headers'],
    exists: true,
    errorMessage: 'authorization is mandatory'
  }
};
