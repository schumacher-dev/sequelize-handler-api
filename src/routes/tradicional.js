const { models } = require('../models');
const express = require('express');
const router = express.Router();

/**
 * Retorna uma lista de Produtos
 */
router.get('/produtos', async (req, res, next) => {
	try {
		let result = await models['produto'].findAll({
			where: req.body.params.where,
			limit: 5
		});

		res.send(result);
	} catch (err) {
		next(err);
	}
});


/**
 * Atualiza um produto por ID
 */
router.put('/produto/:id', async (req, res, next) => {
	try {
		let result = await models['produto'].update(req.body.params.set, {
			where: { id: req.params.id }
		});

		res.send(result);
	} catch (err) {
		next(err);
	}
});


/**
 * Retorna uma lista de Listas de Compra
 */
router.get('/listas', async (req, res, next) => {
	try {
		let result = await models['lista'].findAll({
			where: req.body.params.where,
			limit: 5
		});

		res.send(result);
	} catch (err) {
		next(err);
	}
});



module.exports = router;
