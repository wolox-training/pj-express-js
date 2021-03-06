const albumsController = require('./controllers/albums');
const usersController = require('./controllers/users');
const adminsController = require('./controllers/admins');
const { healthCheck } = require('./controllers/healthCheck');
const paramsValidator = require('./middlewares/validators/paramsValidator');
const schemas = require('./schemas');
const authorizationValidator = require('./middlewares/validators/authorizationValidator');
const adminValidator = require('./middlewares/validators/adminValidator');
const permissionsValidator = require('./middlewares/validators/permissionsValidator');
const buyAlbumValidator = require('./middlewares/validators/buyAlbumValidator');

const URL = '/api/v1';

exports.init = app => {
  app.get('/health', healthCheck);
  app.post(
    `${URL}/users`,
    paramsValidator.validateSchemaAndFail(schemas.users.create),
    usersController.create
  );
  app.get(
    `${URL}/users/:id/albums`,
    [
      paramsValidator.validateSchemaAndFail(schemas.users.indexUserAlbums),
      authorizationValidator.validate,
      permissionsValidator.validate
    ],
    usersController.getUserAlbums
  );
  app.get(
    `${URL}/users`,
    [paramsValidator.validateSchemaAndFail(schemas.users.index), authorizationValidator.validate],
    usersController.getUsers
  );
  app.post(
    `${URL}/admin/users`,
    [paramsValidator.validateSchemaAndFail(schemas.admins.create), adminValidator.validate],
    adminsController.create
  );
  app.post(
    `${URL}/users/sessions`,
    paramsValidator.validateSchemaAndFail(schemas.users.sessions),
    usersController.sessions
  );
  app.post(
    `${URL}/users/sessions/invalidate_all`,
    [paramsValidator.validateSchemaAndFail(schemas.users.invalidateAll), authorizationValidator.validate],
    usersController.invalidateAll
  );
  app.get(
    `${URL}/albums`,
    [paramsValidator.validateSchemaAndFail(schemas.albums.authorization), authorizationValidator.validate],
    albumsController.getAlbums
  );
  app.post(
    `${URL}/albums/:id`,
    [
      paramsValidator.validateSchemaAndFail(schemas.albums.buyAlbum),
      authorizationValidator.validate,
      buyAlbumValidator.validate
    ],
    albumsController.buyAlbum
  );
  app.get(
    `${URL}/albums/:id/photos`,
    [paramsValidator.validateSchemaAndFail(schemas.albums.authorization), authorizationValidator.validate],
    albumsController.getAlbumPhotos
  );
};
