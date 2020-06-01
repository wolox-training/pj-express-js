/* eslint-disable new-cap */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'token_emit_date', {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    }),

  down: queryInterface => queryInterface.removeColumn('users', 'token_emit_date')
};
