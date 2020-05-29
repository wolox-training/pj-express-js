const albumsController = require('./controllers/albums');
const usersController = require('./controllers/users');
const { healthCheck } = require('./controllers/healthCheck');
const paramsValidator = require('./middlewares/paramsValidator');
const schemas = require('./schemas');
const authorizationValidator = require('./middlewares/authorizationValidator');

const URL = '/api/v1';

exports.init = app => {
  app.get('/health', healthCheck);
  app.post(
    `${URL}/users`,
    paramsValidator.validateSchemaAndFail(schemas.users.create),
    usersController.create
  );
  app.post(
    `${URL}/users/sessions`,
    paramsValidator.validateSchemaAndFail(schemas.users.sessions),
    usersController.sessions
  );
  app.get(
    `${URL}/albums`,
    [paramsValidator.validateSchemaAndFail(schemas.albums.authorization), authorizationValidator.validate],
    albumsController.getAlbums
  );
  app.get(
    `${URL}/albums/:id/photos`,
    [paramsValidator.validateSchemaAndFail(schemas.albums.authorization), authorizationValidator.validate],
    albumsController.getAlbumPhotos
  );
};
