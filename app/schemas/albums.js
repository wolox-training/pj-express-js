exports.authorization = {
  authorization: {
    in: ['headers'],
    exists: true
  }
};

exports.buyAlbum = {
  authorization: {
    in: ['headers'],
    exists: true
  },
  user_id: {
    in: ['body'],
    exists: true
  }
};
