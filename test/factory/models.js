const { factory } = require('factory-girl');
const { User } = require('../../app/models');
const { UserAlbum } = require('../../app/models');

factory.define('User', User, {
  firstName: factory.chance('first'),
  lastName: factory.chance('last'),
  password: factory.chance('string', { length: 8, alpha: true }),
  mail: factory.chance('email', { domain: 'wolox.com.ar' }),
  type: 'regular'
});

factory.define('UserAlbum', UserAlbum, {
  albumId: factory.chance('integer'),
  userId: factory.assoc('User', 'id')
});
