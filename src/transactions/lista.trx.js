const { models, sequelize } = require('../models');

module.exports.execute = async function(req, res) {
    let result = await sequelize.query(`
        SELECT id, nome, "createdAt",
                (SELECT count(pl."listaId") FROM "produto-lista" pl where "listaId" = l.id) AS produtos,
                (SELECT count(pl."listaId") FROM "produto-lista" pl where "listaId" = l.id AND comprado = 1) AS comprados
            FROM lista l;
    `);

    return result[0];
}