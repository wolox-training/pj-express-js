const albumsService = require('../services/albums');

exports.getAlbums = (req, res, next) =>
  albumsService
    .albums()
    .then(albumsData => res.send({ data: albumsData }))
    .catch(error => next(error));

exports.getAlbumPhotos = (req, res, next) =>
  albumsService.photos({ album_id: req.params.id }).catch(error => next(error));
