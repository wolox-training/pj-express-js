/* eslint-disable new-cap */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'type', {
      type: Sequelize.DataTypes.ENUM('regular', 'admin'),
      defaultValue: 'regular'
    }),

  down: queryInterface => queryInterface.removeColumn('users', 'type')
};
