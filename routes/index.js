var express = require('express');
var router = express.Router();

//var model_user = require( './../src/model_user_mongo' );
var model_user = require( './../src/model_user_dynamo' );


router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


/* GET home page. */
router.get('/', function(req, res, next) {
	var header_obj = model_user.get_user_status(req.session);

	res.render('index', { title: 'Express', header: header_obj});
});




module.exports = router;
