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

router.get('/ect_test', function(req, res, next) {
  res.render('test', { text: 'ect' });
});

router.get('/sign_in', function(req, res, next) {
  res.render('sign_in');
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


router.get('/create_user', function(req, res){

	mongo.create_user("Yuta", "Moriyama", 18, function(err, obj){
		if(err){
			res.send(err);
		}else{
			res.send(obj);
		}
	})
});

router.get('/show_all_users', function(req, res){
	console.log("show_all_users");
	mongo.retrieve_user_all(function(err, users){
		console.log(users);
		if(err){
			res.send(err);
		}else{
			var user_array = new Array();
			for(var i=0; i< users.length; i++){
				user_array.push(users[i]._doc)
			}
			res.render('show_all_users', {'users': user_array});
		}
	});
});





module.exports = router;
