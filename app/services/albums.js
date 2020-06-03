const request = require('axios');
const querystring = require('querystring');
const logger = require('../logger');
const errors = require('../errors');
const config = require('../../config');
const { UserAlbum } = require('../models');

const options = {
  uri: config.common.api.albumsApiUrl,
  headers: { 'User-Agent': 'Request-Promise' },
  json: true
};

const get = url => {
  logger.info(`GET: ${url}`);
  return request.get(url).catch(error => {
    logger.error(error);
    return Promise.reject(errors.externalApiError(error));
  });
};

const queryString = queryParams => {
  logger.info(queryParams);
  return Object.keys(queryParams).length ? `?${querystring.stringify(queryParams)}` : '';
};

const getAlbums = (queryParams = {}) =>
  get(`${options.uri}/albums${queryString(queryParams)}`).then(response => response.data);

const getPhotos = (queryParams = {}) =>
  get(`${options.uri}/photos${queryString(queryParams)}`).then(response => response.data);

const buyAlbum = async data => {
  logger.info('Create UserAlbum: ', data);
  const albums = await getAlbums({ id: data.albumId });
  logger.info('Albums:', albums);
  if (albums.length === 0) {
    throw errors.notFound(`Album with Id: ${data.albumId} doesn't exist`);
  }

  return UserAlbum.create(data).catch(error => {
    logger.error(error);
    throw errors.databaseError(error.message);
  });
};

module.exports = { getAlbums, getPhotos, buyAlbum };
