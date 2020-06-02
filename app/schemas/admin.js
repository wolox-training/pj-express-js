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
  },
  authorization: {
    in: ['headers'],
    exists: true,
    errorMessage: 'authorization headers is mandatory'
  }
};
