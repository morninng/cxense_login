var express = require('express');
var router = express.Router();

var mongo = require( './../src/mongo' );


router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


/* GET home page. */
router.get('/', function(req, res, next) {
	var header_obj = mongo.get_user_status(req.session);

  res.render('index', { title: 'Express', header: header_obj});
});





module.exports = router;
