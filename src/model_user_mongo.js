var MongoClient = require( 'mongodb' ).MongoClient;
var mongoose = require('mongoose');
var connectionUrl = 'mongodb://localhost:27017/cxense';
mongoose.connect(connectionUrl);
mongoose.connection.on('open', function(){
	console.log("mongoose connected");
});



var User = new  mongoose.Schema({
	email: {type:String, required:true},
	hashed_password: {type:String, required:true},
	first_name: {type:String },
	last_name: {type:String },
	date_created:{type:Date, default:Date.now},
	age:{type:Number}
	tuuid:{type:String}
});
var UserModel = mongoose.model('User', User);



var create_user = function(user_data, callback){

	var newUser = new UserModel();
	newUser["email"] = user_data.email || null;
	newUser["hashed_password"] = user_data.hashed_password || null;
	newUser["first_name"] = user_data.first_name || null;
	newUser["last_name"] = user_data.last_name || null;
	newUser["age"] = user_data.age || null;
	newUser["tuuid"] = user_data.tuuid || null
	newUser.save(callback);

};

var retrieve_user_all = function(callback){
	UserModel.find({},callback);
};

var check_user_existence = function(email_address, callback){
	UserModel.findOne({email: email_address},callback);
}

var get_user_status = function(session){

	var header_obj = new Object();
	if(session.user){
		header_obj.user = true;
		header_obj.name = session.user.first_name + " - " + session.user.last_name;
		header_obj.login = false;

	}else{
		header_obj.user = false;
		header_obj.name = null;
		header_obj.login = true;
	}
	return header_obj;

}


module.exports = {
	create_user: create_user,
	retrieve_user_all: retrieve_user_all,
	check_user_existence: check_user_existence,
	get_user_status: get_user_status
}
