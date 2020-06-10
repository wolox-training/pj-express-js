const errors = require('../../errors');
const albumsService = require('../../services/albums');

exports.validate = async (req, res, next) => {
  const albums = await albumsService.getAlbums({ id: req.params.id });
  if (albums.length === 0) {
    next(errors.notFound(`Album with Id: ${req.params.id} doesn't exist`));
    return;
  }
  next();
};
