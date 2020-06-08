const albumsController = require('./controllers/albums');
const usersController = require('./controllers/users');
const adminsController = require('./controllers/admins');
const { healthCheck } = require('./controllers/healthCheck');
const paramsValidator = require('./middlewares/validators/paramsValidator');
const schemas = require('./schemas');
const authorizationValidator = require('./middlewares/validators/authorizationValidator');
const adminValidator = require('./middlewares/validators/adminValidator');
const userAlbumsValidator = require('./middlewares/validators/userAlbumsValidator');
const buyAlbumValidator = require('./middlewares/validators/buyAlbumValidator');
const userAlbumsMiddleware = require('./middlewares/userAlbumsMiddleware');

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
      userAlbumsMiddleware.updateReq,
      userAlbumsValidator.validate
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
    [paramsValidator.validateSchemaAndFail(schemas.admins.create), adminValidator.validateAdmin],
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
