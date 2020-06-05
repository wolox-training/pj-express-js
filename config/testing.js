exports.config = {
  environment: 'testing',
  isTesting: true,
  common: {
    database: {
      name: process.env.DB_NAME_TEST
    },

    session: {
      secret: 'some-super-secret'
    },
    api: {
      albumsApiUrl: 'https://jsonplaceholder.typicode.com',
      jwtSecret: '4b5376ba96346ca953df19bf51819085',
      paginationLimit: 50,
      tokenExpireSeconds: 30
    },
    mailer: {
      mailerHost: 'smtp.ethereal.email',
      mailerPort: 587,
      mailerUser: 'jared.boyle@ethereal.email',
      mailerPass: '9XqKn4fnumjP9DK8kD',
      adminMail: 'no-reply@walbums.com'
    }
  }
};
