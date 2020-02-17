const albumsService = require('../services/albums');

exports.getAlbums = (req, res, next) =>
  albumsService
    .albums()
    .then(albumsData => res.send({ data: albumsData }))
    .catch(error => next(error));

exports.getAlbumPhotos = (req, res, next) =>
  albumsService
    .photos()
    .then(photos =>
      res.send.json({ data: photos.filter(photo => photo.albumId === parseInt(req.params.id)) })
    )
    .catch(error => next(error));
