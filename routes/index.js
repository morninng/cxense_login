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



router.get('/hello', function (req, res) {
  res.send('Hello World!');
});


router.get('/test', function (req, res, next) {
	next();
}, function(req, res){
	var test_json = {aa:"cc"};
	res.json(test_json);
});



router.get('/sign_in', function(req, res, next) {
  res.render('sign_in');
});


router.post('/sign_in', function(req, res){
	var user_data = req.body;
	var email_address = user_data.email;
	mongo.check_user_existence(email_address, function(err, user){
		if(user){
			res.json({result:false, message:"the email address is already registered"});
			return;
		}
		var password = user_data.password;
		var sha512 = crypto.createHash('sha512');
		sha512.update(password);
		var hashed_password = sha512.digest('hex');
		user_data["hashed_password"] = hashed_password;
		mongo.create_user(user_data, function(err, obj){
			if(err){
				res.json({result:false, message:"saving data failed"});
			}else{
				req.session.user = new Object();
				req.session.user.first_name = user_data["first_name"];
				req.session.user.last_name = user_data["last_name"];
				//var cookie_value = JSON.stringify(req.session.user);
				//res.cookie("user_data", cookie_value, { maxAge: 900000, httpOnly: true });
				res.json({result:true, message:"user data has been registered successfully"});
			}
		})
	})
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/log_in', function(req, res){
	var user_data = req.body;
	var email_address = user_data.email;
	mongo.check_user_existence(email_address, function(err, user){
		if(!user){
			res.json({result:false, message:"no user is registered by this e-mail"});
			return;
		}else{
			var stored_hashed_password = user["hashed_password"]

			var input_password = user_data["password"];
			var sha512 = crypto.createHash('sha512');
			sha512.update(input_password);
			var input_hashed_password = sha512.digest('hex');

			if(stored_hashed_password == input_hashed_password){
				res.json({result:true, message:"login succeed"});
				req.session.user = new Object();
				req.session.user.first_name = user["first_name"];
				req.session.user.last_name = user["last_name"];
			}else{
				res.json({result:false, message:"password and e-mail does not match"});
			}
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
