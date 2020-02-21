const albumsController = require('./controllers/albums');
const usersController = require('./controllers/user');
const userValidator = require('./middlewares/user');
const { healthCheck } = require('./controllers/healthCheck');

const URL = '/api/v1';

exports.init = app => {
  app.get('/health', healthCheck);
  app.post(`${URL}/user`, userValidator.createValidation, usersController.create);
  app.get(`${URL}/albums`, albumsController.getAlbums);
  app.get(`${URL}/albums/:id/photos`, albumsController.getAlbumPhotos);
};
