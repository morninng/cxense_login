
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
            "description":"updated description"
        },
        "price":1000
    },
    UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
    ExpressionAttributeValues:{
        ":r":5.5,
        ":p":"Everything happens all at once.",
        ":a":["Larry", "Moe", "Curly"]
    },
    ReturnValues:"UPDATED_NEW"
};

console.log("Adding a new item...");
docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err));
    } else {
        console.log("updated item:", JSON.stringify(data));
    }
});

