

var model_pv = require( './../src/model_pv_dynamo' );

var count = function(req, res, next){

	model_pv.count_up();
	next();
}

module.exports = {count: count}
