const woloxMailRegexp = /.*@wolox(\.com\.ar|\.co|\.cl)$/;

exports.create = {
  first_name: {
    in: ['body'],
    exists: true,
    errorMessage: 'first_name is mandatory'
  },
  last_name: {
    in: ['body'],
    exists: true,
    errorMessage: 'last_name is mandatory'
  },
  password: {
    in: ['body'],
    exists: true,
    isLength: {
      options: { min: 8 }
    },
    isAlphanumeric: true
  },
  mail: {
    in: ['body'],
    exists: true,
    isEmail: true
  }
};

exports.sessions = {
  mail: {
    in: ['body'],
    exists: true,
    isEmail: true,
    custom: {
      options: email => woloxMailRegexp.test(email)
    }
  }
};

exports.index = {
  authorization: {
    in: ['headers'],
    exists: true
  }
};

exports.indexUserAlbums = {
  authorization: {
    in: ['headers'],
    exists: true
  }
};
