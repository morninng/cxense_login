
var config = require('./cxense.conf');
var AWS = require("aws-sdk");
AWS.config.update({accessKeyId: config.AwsKeyId, secretAccessKey: config.SecretKey});

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year = 2015;
var title = "Other titles";

var params = {
    TableName:table,
    Item:{
        "year": year,
        "title": title,
        "info":{
            "plot":"Something happens."
        }
    },
    ConditionExpression: "#yr <> :yyyy and title <> :t",
    ExpressionAttributeNames:{"#yr":"year"},
    ExpressionAttributeValues:{
        ":yyyy":year,
        ":t":title
    }
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to put items. Error JSON:", JSON.stringify(err));
    } else {
        console.log("put item success:", JSON.stringify(data));
    }
});