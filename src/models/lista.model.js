'use strict';
module.exports = (sequelize, DataTypes) => {
  var tabela = sequelize.define('lista', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(60), allowNull: false, unique: true },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false }
  });

  tabela.associate = function (models) {
    models.lista.belongsToMany(models.produto, { as: 'items', through: 'produto-lista', foreignKey: 'listaId' })
  };

  return tabela;
};
