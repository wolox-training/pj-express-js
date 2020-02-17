const albumsController = require('./controllers/albums');
const { healthCheck } = require('./controllers/healthCheck');

const URL = '/api/v1';

exports.init = app => {
  app.get('/health', healthCheck);
  app.get(`${URL}/albums`, albumsController.getAlbums);
  app.get(`${URL}/albums/:id/photos`, albumsController.getAlbumPhotos);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
