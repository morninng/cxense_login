
var config = require('./cxense.conf');
var AWS = require("aws-sdk");
AWS.config.update({accessKeyId: config.AwsKeyId, secretAccessKey: config.SecretKey});


AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient()


// Increment an atomic counter

var params = {
    TableName:"Movies",
    Key:{
        "year": 2013,
        "title": "himawari"
    },
    UpdateExpression: "set info.rating = info.rating + :val",
    ExpressionAttributeValues:{
        ":val":1
    },
    ReturnValues:"UPDATED_NEW"
};

console.log("Updating the item...");

docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});

