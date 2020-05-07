const albumsService = require('../services/albums');

exports.getAlbums = (req, res, next) =>
  albumsService
    .getAlbums(req.query)
    .then(albumsData => res.send(albumsData.data))
    .catch(error => next(error));

exports.getAlbumPhotos = (req, res, next) =>
  albumsService
    .getPhotos({ ...{ albumId: req.params.id }, ...req.query })
    .then(photoData => res.send(photoData.data))
    .catch(error => next(error));
