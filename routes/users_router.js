var express = require('express');
var crypto = require("crypto");
var uuid = require('uuid');
var config_common = require('./../src/config_common.conf')

var router = express.Router();
//var model_user = require( './../src/model_user_mongo' );
var model_user = require( './../src/model_user_dynamo' );

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/sign_in', function(req, res, next) {
  var header_obj = model_user.get_user_status(req.session);
  
  res.render('sign_in', {header: header_obj});
});


router.post('/sign_in', function(req, res){
	var user_data = req.body;
	var email_address = user_data.email;
	model_user.check_user_existence(email_address, function(err, user){
		if(user){
			res.json({result:false, message:"the email address is already registered"});
			return;
		}
		var password = user_data.password;
		var sha512 = crypto.createHash('sha512');
		sha512.update(password);
		var hashed_password = sha512.digest('hex');
		user_data["hashed_password"] = hashed_password;
		user_data["tuuid"] = uuid.v4();
		var date = new Date();
		var temporal_random = date.getTime();
		user_data["temporal_random"] = temporal_random;
		res.cookie('tuuid', user_data["tuuid"], {maxAge: config_common.session_maxage, httpOnly:false});

		model_user.create_user(user_data, function(err, obj){
			if(err){
				res.json({result:false, message:"saving data failed"});
			}else{
				req.session.user = new Object();
				req.session.user.first_name = user_data["first_name"];
				req.session.user.last_name = user_data["last_name"];
				req.session.user.temporal_random = temporal_random;
				res.cookie('temporal_random', temporal_random, {maxAge: config_common.session_maxage, httpOnly:false});

				var message = email_address + String(temporal_random);
				var hmac_sha256 = crypto.createHash('sha256', hashed_password);
				var mac = hmac_sha256.update(message).digest('hex');
				res.cookie('mac', mac, {maxAge: config_common.session_maxage, httpOnly:false});
				res.json({result:true, message:"user data has been registered successfully"});
			}
		})
	})
});



router.get('/login', function(req, res, next) {
  var header_obj = model_user.get_user_status(req.session);

  res.render('login', {header: header_obj});
});



router.post('/log_in', function(req, res){
	var user_data = req.body;
	var email_address = user_data.email;
	model_user.check_user_existence(email_address, function(err, user){
		if(err){
			res.json({result:false, message:"database access error"});
			return;
		} else if(!user){
			res.json({result:false, message:"no user is registered by this e-mail"});
			return;
		}else{
			var stored_hashed_password = user["hashed_password"]

			var input_password = user_data["password"];
			var sha512 = crypto.createHash('sha512');
			sha512.update(input_password);
			var input_hashed_password = sha512.digest('hex');

			if(stored_hashed_password == input_hashed_password){
				req.session.user = new Object();
				req.session.user.first_name = user["first_name"];
				req.session.user.last_name = user["last_name"];
				var tuuid = user["tuuid"];
				res.cookie('tuuid', tuuid, {maxAge:config_common.session_maxage, httpOnly:false});
					
				var date = new Date();
				var temporal_random = date.getTime();
				req.session.user.temporal_random = temporal_random;
				res.cookie('temporal_random', temporal_random, {maxAge: config_common.session_maxage, httpOnly:false});
				model_user.update_user(email_address, 'temporal_random', temporal_random);

				var message = email_address + String(temporal_random);
				var hmac_sha256 = crypto.createHash('sha256', stored_hashed_password);
				var mac = hmac_sha256.update(message).digest('hex');
				res.cookie('mac', mac, {maxAge: config_common.session_maxage, httpOnly:false});

				res.json({result:true, message:"login succeed"});
			}else{
				res.json({result:false, message:"password and e-mail does not match"});
			}
		}
	})
});



router.get('/logout', function(req, res){

	req.session.user = null;
	res.send();
});

/*the url is http://localhost:3000/users/show_all_users */

router.get('/show_all_users', function(req, res){
	console.log("show_all_users");
	model_user.retrieve_user_all(function(err, user_array){
		console.log(user_array);
		if(err){
			res.send(err);
		}else{
			/*
			var user_array = new Array();
			for(var i=0; i< users.length; i++){
				user_array.push(users[i]._doc)
			}*/
			res.render('show_all_users', {'users': user_array});
		}
	});
});


module.exports = router;
