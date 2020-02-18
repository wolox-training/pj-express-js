const request = require('axios');
const logger = require('/logger');
const errors = require('../errors');
const config = require('./config');

const options = {
  uri: config.common.api.albumsApiUrl,
  headers: { 'User-Agent': 'Request-Promise' },
  json: true
};

const get = data => {
  logger.info(`GET ${data}`);
  return request
    .get(data)
    .then(response => {
      logger.info(response);
    })
    .catch(error => {
      errors.externalApiError(error);
    });
};

exports.albums = () => get({ ...options, uri: `${options.uri}/albums` });

exports.photos = () => get({ ...options, uri: `${options.uri}/photos` });
