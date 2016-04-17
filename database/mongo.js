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
});
var UserModel = mongoose.model('User', User);



var create_user = function(user_data, callback){

	var newUser = new UserModel();
	newUser["email"] = user_data.email || null;
	newUser["hashed_password"] = user_data.hashed_password || null;
	newUser["first_name"] = user_data.first_name || null;
	newUser["last_name"] = user_data.last_name || null;
	newUser["age"] = user_data.age || null;
	newUser.save(callback);

};

var retrieve_user_all = function(callback){
	UserModel.find({},callback);
};

var check_user_existence = function(email_address, callback){
	UserModel.find({email: email_address},callback);
}

module.exports = {
	create_user: create_user,
	retrieve_user_all: retrieve_user_all,
	check_user_existence: check_user_existence
}
