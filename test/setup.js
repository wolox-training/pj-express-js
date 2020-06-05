const nock = require('nock');
const mockDate = require('mockdate');
const models = require('../app/models');

const tables = Object.values(models.sequelize.models);

const truncateTable = model =>
  model.destroy({ truncate: true, cascade: true, force: true, restartIdentity: true });

const truncateDatabase = () => Promise.all(tables.map(truncateTable));

global.beforeAll(() => {
  mockDate.set('2020-06-03');
});

global.beforeEach(async () => {
  nock.cleanAll();
  await truncateDatabase();
});
