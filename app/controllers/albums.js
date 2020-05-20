const albumsService = require('../services/albums');

exports.getAlbums = (req, res, next) =>
  albumsService
    .getAlbums(req.query, req.headers.user_id, req.headers.authorization)
    .then(albumsData => res.send(albumsData))
    .catch(error => next(error));

exports.getAlbumPhotos = (req, res, next) =>
  albumsService
    .getPhotos({ albumId: req.params.id, ...req.query }, req.headers.user_id, req.headers.authorization)
    .then(photoData => res.send(photoData))
    .catch(error => next(error));
