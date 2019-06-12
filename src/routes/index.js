const { CommonService } = require('../services/common.service');
const { RoutesController } = require('./routes.controller');
const { models, sequelize } = require('../models');
const express = require('express');
const router = express.Router();

function routeGuard(req, res, next) {
	if (!req.params.model) {
		throw new Error(`Model não informado`);
	}

	if (!models[req.params.model]) {
		throw new Error(`Model ${req.params.model} Inválido`);
	}

	next();
}

/**
 * Execute Query
 */
router.post('/transaction/:transaction', async (req, res, next) => {
	try {
		let trx = require(`../transactions/${req.params.transaction}.trx`);
		let result = await trx.execute(req, res);
		res.send(result);
	} catch (err) {
		next(err);
	}
});


/**
 * Execute Query
 */
router.post('/raw-query', routeGuard, async (req, res, next) => {
	try {
		let result = await sequelize.query(req.body.query, req.body.options);
		res.send(result[0]);
	} catch (err) {
		next(err);
	}
});


/**
 * Delete
 */
router.post('/:model/delete', routeGuard, async (req, res, next) => {
	try {
		let result = await RoutesController.delete(req, req.body, {
      model: req.params.model
    });
		res.send({ nRows: result });
	} catch (err) {
		next(err);
	}
});



/**
 * Update
 */
router.post('/:model/update', routeGuard, async (req, res, next) => {
	try {
		let result = await RoutesController.update(req, req.body, {
      model: req.params.model
    });
		res.send({ nRows: result[0] });
	} catch (err) {
		next(err);
	}
});


/**
 * Create
 */
router.post('/:model/create', routeGuard, async (req, res, next) => {
	try {
		let result = await RoutesController.create(req, req.body, {
      model: req.params.model
    });
		res.send(result);
	} catch (err) {
		next(err);
	}
});


/**
 * Bulk Create
 */
router.post('/:model/bulkCreate', routeGuard, async (req, res, next) => {
	try {
		let result = await RoutesController.bulkCreate(req, req.body, {
      model: req.params.model
    });
		res.send(result);
	} catch (err) {
		next(err);
	}
});


/**
 * Find All
 */
router.post('/:model/findAll', routeGuard, async (req, res, next) => {
	try {
		console.log(req.body.params.where);
		let result = await RoutesController.findAll(req, req.body, {
      model: req.params.model
    });
		res.send(result);
	} catch (err) {
		next(err);
	}
});



/**
 * Find One
 */
router.post('/:model/findOne', routeGuard, async (req, res, next) => {
	try {
		let result = await RoutesController.findOne(req, req.body, {
      model: req.params.model
    });
		res.send(result);
	} catch (err) {
		next(err);
	}
});



/**
 * Find One
 */
router.post('/main', async (req, res, next) => {
	try {
    let result = await RoutesController.main(req, req.body);
		res.send(result);
	} catch (err) {
		next(err);
	}
});



module.exports = router;
