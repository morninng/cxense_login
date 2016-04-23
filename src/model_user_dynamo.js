

 
var dynamo = require('./dynamo');
var docClient = dynamo.docClient;

var create_user = function(user_data, callback){

	var params = {
	    TableName:"User",
	    Item:{
	    	"email": user_data.email || null,
	        "first_name": user_data.first_name || null,
	        "last_name": user_data.last_name || null,
	        "age": user_data.age || null,
	        "hashed_password": user_data.hashed_password || null
	    }
	};
	console.log("Adding a new item...");
	docClient.put(params, callback);

};


var retrieve_user_all = function(callback){

	var params = {
	    TableName:"User",
	};
	docClient.scan(params, function(err, data){
		callback(err, data.Items);
	});

};

var check_user_existence = function(email_address, callback){
	var params = {
		TableName: "User",
		Key: {
			"email": email_address
		}
	};
	docClient.get(params, 
		function(err, data){
			if(data){
				callback(err, data.Item);
			}else{
				callback(err, null);
			}
		}
	);


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
