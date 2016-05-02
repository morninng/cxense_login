
var dynamo = require('./dynamo');
var docClient = dynamo.docClient;


var count_up = function(){


	var params = {
	    TableName:"PV_COUNT",
	    Key:{
	        "pv_distinguish": "XXXXXXX",
	    },
	    UpdateExpression: "set pv_count = pv_count + :val",
	    ExpressionAttributeValues:{
	        ":val":1
	    },
	    ReturnValues:"UPDATED_NEW"
	};


	docClient.update(params, function(err, data) {
	    if (err) {
	        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
	    } else {
	        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
	    }
	});

};





module.exports = {
	count_up: count_up
}
