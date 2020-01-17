const albumsService = require('../services/albums');

function albums(req, res) {
  albumsService
    .albums()
    .then(albumsData => res.status(200).json({ status: 200, data: albumsData }))
    .catch(error =>
      res
        .status(400)
        .json({ status: 400, message: "Couldn't get albums from albums service", error: error.message })
    );
}

function albumPhotos(req, res) {
  albumsService
    .photos()
    .then(photos =>
      res
        .status(200)
        .json({ status: 200, data: photos.filter(photo => photo.albumId === parseInt(req.params.id)) })
    )
    .catch(error =>
      res
        .status(400)
        .json({ status: 400, message: "Couldn't get photos from albums service", error: error.message })
    );
}

export { albums, albumPhotos };
