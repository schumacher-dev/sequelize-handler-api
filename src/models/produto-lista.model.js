'use strict';
module.exports = (sequelize, DataTypes) => {
  var tabela = sequelize.define('produto-lista', {
    produtoId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'produto', key: 'id' } },
    listaId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'lista', key: 'id' } },
    comprado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    dataComprado: { type: DataTypes.DATE, allowNull: true }
  }, {
      timestamps: false
  });

  tabela.beforeCreate((model, options, callback) => {
    if (model.comprado) {
      model.dataComprado = new Date();
    }
    
    return model;
  })

  return tabela;
};
