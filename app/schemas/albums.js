exports.authorization = {
  authorization: {
    in: ['headers'],
    exists: true
  },
  user_id: {
    in: ['headers'],
    exists: true
  }
};
