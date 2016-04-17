var express = require('express');
var crypto = require("crypto");
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



router.post('/create_user', function(req, res){
	var user_data = req.body;
	var password = user_data.password;

	var sha512 = crypto.createHash('sha512');
	sha512.update(password);
	var hashed_password = sha512.digest('hex');

	user_data["hashed_password"] = hashed_password;


	mongo.create_user(user_data, function(err, obj){
		if(err){
			res.json({result:false, message:"saving data failed"});
		}else{
			res.json({result:true, message:"user data has been registered successfully"});
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
