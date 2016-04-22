---------------------------------
(1) create user table

 primary key: emailaddress

 no range key is ncessary because email address is already unique to identify person


 var params = {
    TableName : "User",
    KeySchema: [       
        { AttributeName: "email", KeyType: "HASH" }
    ],
    AttributeDefinitions: [       
        { AttributeName: "email", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 1, 
        WriteCapacityUnits: 1
    }
};
dynamodb.createTable(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err));
    else
        console.log(JSON.stringify(data));
});
-------------------
check table existence with list

var params = {};
dynamodb.listTables(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err));
    else
        console.log(JSON.stringify(data));
})

-------------------------
check table info

var params = {
    TableName: "User"
};
dynamodb.describeTable(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err));
    else
        console.log(JSON.stringify(data));
});



-------------------------------

(2)put user data on the table


var params = {
    TableName: "User",
    Item: {
        "email":"yuta.moriyama@gmmail.com",
        "first_name":"yuta",
        "last_name":"moriyama",
        "age": 15
    },
    "ConditionExpression": "attribute_not_exists(email)"
};
docClient.put(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err));
    else
        console.log(JSON.stringify(data));
});

-------------------------
read the data from email address

var params = { 
    TableName: "User",
    Key: {
        "email":"yuta.moriyama@gmmail.com"
    }
};

docClient.get(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err));
    else
        console.log(JSON.stringify(data));
});

-----
retrieve only age

var params = { 
    TableName: "User",
    Key: {
        "email":"yuta.moriyama@gmmail.com"
    },
    ProjectionExpression: "age"
};

docClient.get(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err));
    else
        console.log(JSON.stringify(data));
});
---------------------------------------------
(3) search user by query


var params = {
    TableName: "User",
    KeyConditionExpression: "Artist = :artist",
    ExpressionAttributeValues: {
        ":artist": "No One You Know"
    }
};

docClient.query(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});




