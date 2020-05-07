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

const get = url => {
  logger.info(`GET ${url}`);
  return request.get(url).catch(error => Promise.reject(errors.externalApiError(error)));
};

const queryString = queryParams => {
  logger.info(queryParams);
  return Object.keys(queryParams).length ? `?${querystring.stringify(queryParams)}` : '';
};

exports.getAlbums = (queryParams = {}) => get(`${options.uri}/albums${queryString(queryParams)}`);

exports.getPhotos = (queryParams = {}) => get(`${options.uri}/photos${queryString(queryParams)}`);
