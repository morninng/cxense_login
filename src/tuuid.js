

var uuid = require('uuid');

var set_tuuid = function(req, res, next){

	var existing_tuuid = req.cookies.tuuid;
	if(!existing_tuuid){
		var tuuid = uuid.v4();
		res.cookie('tuuid', tuuid, {maxAge:60000, httpOnly:false});
	}
	next();

}

module.exports = {set_tuuid: set_tuuid}