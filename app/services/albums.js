const request = require('axios');
const querystring = require('querystring');
const logger = require('../logger');
const errors = require('../errors');
const config = require('../../config');

const options = {
  uri: config.common.api.albumsApiUrl,
  headers: { 'User-Agent': 'Request-Promise' },
  json: true
};

const get = data => {
  logger.info(`GET ${data}`);
  return request.get(data).catch(error => Promise.reject(errors.externalApiError(error)));
};

exports.albums = (queryParams = {}) =>
  get({ ...options, uri: `${options.uri}/albums` }, querystring.stringify(queryParams));

exports.photos = (queryParams = {}) =>
  get({ ...options, uri: `${options.uri}/photos` }, querystring.stringify(queryParams));
