'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('produto-lista', {
      produtoId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'produto', key: 'id' } },
      listaId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'lista', key: 'id' } }
    });

    await queryInterface.addConstraint('produto-lista', ['produtoId', 'listaId'], {
      type: 'unique',
      name: 'produto-lista_unique_produtoId_listaId'
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('produto-lista');
  }
};
