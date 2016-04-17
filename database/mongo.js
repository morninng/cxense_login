var MongoClient = require( 'mongodb' ).MongoClient;
var mongoose = require('mongoose');
var connectionUrl = 'mongodb://localhost:27017/cxense';
mongoose.connect(connectionUrl);
mongoose.connection.on('open', function(){
	console.log("mongoose connected");
});



var User = new  mongoose.Schema({
	first_name: {type:String, required:true},
	last_name: {type:String, required:true},
	date_created:{type:Date, default:Date.now},
	age:{type:Number}
});
var UserModel = mongoose.model('User', User);



var create_user = function(FirstName, LastName, age_num, callback){
	var newUser = new UserModel({'first_name':FirstName,'last_name':LastName,'age':age_num});
	newUser.save(callback);
};

var retrieve_user_all = function(callback){
	UserModel.find({},callback);
};


module.exports = {
	create_user: create_user,
	retrieve_user_all: retrieve_user_all
}
