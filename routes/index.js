var express = require('express');
var router = express.Router();

var mongo = require( './../database/mongo' );


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




router.get('/db_insert_sample', function (req, res) {

    var sampleCollection = 'chapters';
	var chapters = [{
	    'Title': 'Snow Crash',
	    'Author': 'Neal Stephenson'
	},{
	    'Title': 'Snow Crash',
	    'Author': 'Neal Stephenson'
	}];

	mongo.insert(sampleCollection, chapters, function(error, result){
		console.log("call back called");
		console.log(result);
		if(error){
			res.send(error);
		}else{
			res.send(result.result);
		}
	} );


});



module.exports = router;
