const { CommonService } = require('../services/common.service');
const { models } = require('../models');
const { Op } = require('sequelize');

let RoutesController = {};

/**
 * Find One
 */
RoutesController.findOne = async (req, body, params) => {
	if (body.params.include) {
		CommonService.setModelsToQuery(models, body.params);
	}

	let result = await models[params.model].findOne(body.params);
	return result;
}


/**
 * Find All
 */
RoutesController.findAll = async (req, body, params) => {
	if (body.params.include) {
		CommonService.setModelsToQuery(models, body.params);
	}

	body.params.where = CommonService.sequelizeWhereOp(body.params.where, '$');

	let result = await models[params.model].findAll(body.params);
	return result;
}


/**
 * Bulk Create
 */
RoutesController.bulkCreate = async (req, body, params) => {
	if (!Array.isArray(body.data)) {
		throw new Error("Parâmetro data precisa ser um array");
	}

	let result = await models[params.model].bulkCreate(body.data);
	return result;
}


/**
 * Create
 */
RoutesController.create = async (req, body, params) => {
	let result = await models[params.model].create(body.data);
	return result;
}


/**
 * Update
 */
RoutesController.update = async (req, body, params) => {
	if (Object.keys(body.params.where) <= 0) {
		throw new Error("Update não pode ser executado sem where");
	}

	let result = await models[params.model].update(body.params.set, body.params);
	return result;
}



/**
 * Delete
 */
RoutesController.delete = async (req, body, params) => {
	if ((body.options && !body.options.truncate) && Object.keys(body.params.where) <= 0) {
		throw new Error("Delete não pode ser executado sem where");
	}

	let result = await models[params.model].destroy(body.params, body.options);
	return result;
}



/**
 * Sync Main Process
 * -- private function
 *
 * @param {Request} req
 * @param {Object} body
 * @param {Object} params
 */
async function syncMainProcess(req, body, params) {
	let results = [];
	for (let k in body.manifest) {
		let result = null;
		let itemBody = body.manifest[k];

		switch (itemBody.method) {
			case 'findAll':
				result = await RoutesController.findAll(req, itemBody, { model: itemBody.model });
				results.push({ ['findAll_' + itemBody.model]: result });
				break;

			case 'findOne':
				result = await RoutesController.findOne(req, itemBody, { model: itemBody.model });
				results.push({ ['findOne_' + itemBody.model]: result });
				break;

			case 'bulkCreate':
				result = await RoutesController.bulkCreate(req, itemBody, { model: itemBody.model });
				results.push({ ['bulkCreate_' + itemBody.model]: result });
				break;

			case 'create':
				result = await RoutesController.create(req, itemBody, { model: itemBody.model });
				results.push({ ['create_' + itemBody.model]: result });
				break;

			case 'update':
				result = await RoutesController.update(req, itemBody, { model: itemBody.model });
				results.push({ ['update_' + itemBody.model]: result });
				break;

			case 'delete':
				result = await RoutesController.delete(req, itemBody, { model: itemBody.model });
				results.push({ ['delete_' + itemBody.model]: result });
				break;
		}
	}

	return results;
}



/**
 * Async Main Process
 * -- private function
 *
 * @param {Request} req
 * @param {Object} body
 * @param {Object} params
 */
async function asyncMainProcess(req, body, params) {
	let results = [];
	for (let k in body.manifest) {
		let itemBody = body.manifest[k];

		switch (itemBody.method) {
			case 'findAll':
				results.push(
					RoutesController.findAll(req, itemBody, { model: itemBody.model })
				);
				break;

			case 'findOne':
				results.push(
					RoutesController.findOne(req, itemBody, { model: itemBody.model })
				);
				break;

			case 'bulkCreate':
				results.push(
					RoutesController.bulkCreate(req, itemBody, { model: itemBody.model })
				);
				break;

			case 'create':
				results.push(
					RoutesController.create(req, itemBody, { model: itemBody.model })
				);
				break;

			case 'update':
				results.push(
					RoutesController.update(req, itemBody, { model: itemBody.model })
				);
				break;

			case 'delete':
				results.push(
					RoutesController.delete(req, itemBody, { model: itemBody.model })
				);
				break;
		}
	}

	return await Promise.all(results);
}



/**
 * Main
 */
RoutesController.main = async (req, body, params) => {
	if (!Array.isArray(body.manifest)) {
		throw new Error("Parâmetros não é um array");
	}

	if (!body.async) {
		return await syncMainProcess(req, body, params);
	} else {
		return await asyncMainProcess(req, body, params);
	}
}

module.exports = { RoutesController }
