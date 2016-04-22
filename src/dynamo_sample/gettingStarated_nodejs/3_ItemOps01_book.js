
var config = require('./cxense.conf');
var AWS = require("aws-sdk");
AWS.config.update({accessKeyId: config.AwsKeyId, secretAccessKey: config.SecretKey});

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();



var params = {
    TableName:"Books",
    Item:{
        "title": "thw ban tobacco",
        "author": "Miyamura yasushi",
        "detail":{
            "description":"Something happens."
        }
    }
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err));
    } else {
        console.log("Added item:", JSON.stringify(data));
    }
});

