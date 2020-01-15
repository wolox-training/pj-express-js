const request = require('request-promise');

const options = {
  uri: 'https://jsonplaceholder.typicode.com',
  headers: { 'User-Agent': 'Request-Promise' },
  json: true
};

function get(data) {
  return request(data).catch(error => {
    console.log(error);
  });
}

function albums() {
  const albumOptions = { ...options };
  albumOptions.uri = `${options.uri}/albums`;
  return get(albumOptions);
}

function photos() {
  const photoOptions = { ...options };
  photoOptions.uri = `${options.uri}/photos`;
  return get(photoOptions);
}

export { albums, photos };
