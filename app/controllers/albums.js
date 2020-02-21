const albumsService = require('../services/albums');

exports.getAlbums = (req, res, next) =>
  albumsService
    .getAlbums()
    .then(albumsData => res.send({ data: albumsData }))
    .catch(error => next(error));

exports.getAlbumPhotos = (req, res, next) =>
  albumsService.getPhotos({ albumId: req.params.id }).catch(error => next(error));
