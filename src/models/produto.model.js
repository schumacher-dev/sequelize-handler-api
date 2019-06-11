'use strict';
module.exports = (sequelize, DataTypes) => {
  var tabela = sequelize.define('produto', {
    // id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(60), allowNull: false, unique: true },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false }
  });

  tabela.associate = function (models) {
    models.produto.belongsToMany(models.lista, { as: 'items', through: 'produto-lista', foreignKey: 'produtoId' })
  };

  return tabela;
};
