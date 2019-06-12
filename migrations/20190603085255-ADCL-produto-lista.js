'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('produto-lista', 'comprado', { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false });
    await queryInterface.addColumn('produto-lista', 'dataComprado', { type: Sequelize.DATE, allowNull: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('produto-lista', 'comprado');
    await queryInterface.removeColumn('produto-lista', 'dataComprado');
  }
};
