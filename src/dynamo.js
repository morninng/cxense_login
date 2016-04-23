var config = require('./cxense.conf');
var AWS = require("aws-sdk");
AWS.config.update({accessKeyId: config.AwsKeyId, secretAccessKey: config.SecretKey});


AWS.config.update({
  region: config.dynamo_url,
  endpoint: config.dynamo_region
});


 var aws_client = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
	docClient: docClient,
	aws_client: aws_client
}
