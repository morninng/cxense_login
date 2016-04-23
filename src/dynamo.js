//var config = require('./config_local.conf');
var config = require('./config_aws.conf');
var AWS = require("aws-sdk");


if(config.local){
	AWS.config.update({accessKeyId: config.AwsKeyId, secretAccessKey: config.SecretKey});
}

AWS.config.update({
  region: config.dynamo_region,
  endpoint: config.dynamo_url
});


 var aws_client = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
	docClient: docClient,
	aws_client: aws_client
}
