var express = require('express');
var crypto = require("crypto");
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

router.get('/ect_test', function(req, res, next) {
  res.render('test', { text: 'ect' });
});



router.get('/hello', function (req, res) {
  res.send('Hello World!');
});


router.get('/test', function (req, res, next) {
	next();
}, function(req, res){
	var test_json = {aa:"cc"};
	res.json(test_json);
});



module.exports = router;
