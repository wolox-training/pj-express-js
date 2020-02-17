const request = require('request-promise');
const errors = require('errors.js');
const logger = require('/logger/index.js');

const options = {
  uri: process.env.ALBUMS_API_URL,
  headers: { 'User-Agent': 'Request-Promise' },
  json: true
};

const get = data => {
  logger.info(`GET ${data}`);
  request(data).catch(error => {
    errors.defaultError(error);
  });
};

exports.albums = () => {
  const albumOptions = { ...options };
  albumOptions.uri = `${options.uri}/albums`;
  return get(albumOptions);
};

exports.photos = () => {
  const photoOptions = { ...options };
  photoOptions.uri = `${options.uri}/photos`;
  return get(photoOptions);
};
