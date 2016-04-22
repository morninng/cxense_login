
var config = require('./cxense.conf');
var AWS = require("aws-sdk");
AWS.config.update({accessKeyId: config.AwsKeyId, secretAccessKey: config.SecretKey});


AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Scan with title wording.");

var params = {
    TableName : "Movies",
    ProjectionExpression: "#yr, title, info.rating",
    FilterExpression: "begins_with(title, :letter)",
    ExpressionAttributeNames: {
        "#yr": "year",
    },
    ExpressionAttributeValues: {
        ":letter": "Ab"
    }
};

docClient.scan(params, onScan);

function onScan(err, data){
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // print all the movies
        console.log("Scan succeeded.");
        data.Items.forEach(function(movie) {
           console.log( movie.year + ": ", movie.title);
        });

        // continue scanning if we have more movies
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
};

