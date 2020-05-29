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
      jwtSecret: '4b5376ba96346ca953df19bf51819085'
    }
  }
};
