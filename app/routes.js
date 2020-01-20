const albumsController = require('./controllers/albums');
const userController = require('./controllers/user');
const userValidator = require('./middlewares/user');
const { healthCheck } = require('./controllers/healthCheck');

const URL = '/api/v1';

exports.init = app => {
  app.get('/health', healthCheck);
  // Albums
  app.get(`${URL}/albums`, [], albumsController.albums);
  app.get(`${URL}/albums/:id/photos`, [], albumsController.albumPhotos);
  // Users
  app.post(`${URL}/user`, userValidator.createValidation, userController.create);
};
