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
      albumsApiUrl: process.env.ALBUMS_API_URL || 'https://jsonplaceholder.typicode.com'
    }
  }
};
