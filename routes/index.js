var express = require('express');
var router = express.Router();


router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
