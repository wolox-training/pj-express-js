const albumsController = require('./controllers/albums');
const usersController = require('./controllers/users');
const adminsController = require('./controllers/admins');
const { healthCheck } = require('./controllers/healthCheck');
const paramsValidator = require('./middlewares/validators/paramsValidator');
const schemas = require('./schemas');
const authorizationValidator = require('./middlewares/validators/authorizationValidator');
const adminValidator = require('./middlewares/validators/adminValidator');

const URL = '/api/v1';

exports.init = app => {
  app.get('/health', healthCheck);
  app.post(
    `${URL}/users`,
    paramsValidator.validateSchemaAndFail(schemas.users.create),
    usersController.create
  );
  app.post(
    `${URL}/admin/users`,
    [
      paramsValidator.validateSchemaAndFail(schemas.admins.create),
      adminValidator.create,
      adminValidator.validateAdmin,
      authorizationValidator.validate
    ],
    adminsController.create
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
