const { models, sequelize } = require('../models');

module.exports.execute = async function(req, res) {
    let result = [];
    let a = await models.usuario.findAll({ raw: true });
    let b = await models.tarefa.findAll({ raw: true });

    result.push(a);
    result.push(b);
    
    return result;
}