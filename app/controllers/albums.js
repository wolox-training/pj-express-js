const albumsService = require('../services/albums');
const userAlbumsService = require('../services/userAlbums');
const usersService = require('../services/users');

exports.getAlbums = (req, res, next) =>
  albumsService
    .getAlbums(req.query)
    .then(albumsData => res.send(albumsData))
    .catch(error => next(error));

exports.getAlbumPhotos = (req, res, next) =>
  albumsService
    .getPhotos({ albumId: req.params.id, ...req.query })
    .then(photoData => res.send(photoData))
    .catch(error => next(error));

exports.buyAlbum = (req, res, next) =>
  usersService
    .findUserByMail(req.userToken.mail)
    .then(user => {
      userAlbumsService
        .buyAlbum({ albumId: req.params.id, userId: user.id })
        .then(response => res.send(response))
        .catch(error => next(error));
    })
    .catch(error => next(error));
