const { Op } = require('sequelize');

const CommonService = {};

CommonService.setModelsToQuery = function(models, params) {
    params.include.forEach(item => {
        if (!models[item.model]) {
            throw new Error(`Model ${item.model} é inválido`);
        }

        item.model = models[item.model];
    });
}

CommonService.sequelizeWhereOp = (whereObj, opSymbol) => {
	let result = {};

	function _whereAdjust(_whereObj, _opSymbol, res) {
		let keys = Object.keys(_whereObj);
		for (let k in keys) {
			if (keys[k][0] == _opSymbol) {
				console.log([Op[keys[k].slice(1)]]);
				res[Op[keys[k].slice(1)]] = _whereObj[keys[k]];
			} 
			
			if (Array.isArray(_whereObj[keys[k]])) {
				for (let i in _whereObj[keys[k]]) {
					if (typeof _whereObj[keys[k]][i] == 'object') {
						return _whereAdjust(_whereObj[keys[k]], _opSymbol, res[keys[k]]); 
					}
				}
			} else if (typeof _whereObj[keys[k]] == 'object') {
				res[keys[k]] = {};
				return _whereAdjust(_whereObj[keys[k]], _opSymbol, res[keys[k]]);
			} else {
				res[keys[k]] = _whereObj[keys[k]];
			}
		}
	}

	_whereAdjust(whereObj, opSymbol, result);
	return result;
}

module.exports = { CommonService }