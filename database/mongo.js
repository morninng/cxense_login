

var db = null;
var MongoClient = require( 'mongodb' ).MongoClient;
var assert = require( 'assert' );
var connectionUrl = 'mongodb://localhost:27017/cxense';


MongoClient.connect(connectionUrl, function(err, mongodb) {
	if(!err){
		db = mongodb;
		console.log("db opened correctly");
	}else{
		console.log("db open failed");
	}
});


function insert(collection_name, document, callback){
	var collection = db.collection(collection_name);
	collection.insert(document, callback);
}




module.exports = {
	insert: insert
}
