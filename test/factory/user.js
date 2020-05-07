const { factory } = require('factory-girl');
const { User } = require('../../app/models');

factory.define('User', User, {
  first_name: factory.chance('first'),
  last_name: factory.chance('last'),
  password: factory.chance('string', { length: 8, alpha: true }),
  mail: factory.chance('email', { domain: 'wolox.com.ar' })
});
