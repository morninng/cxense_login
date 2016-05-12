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


 var params = {
    TableName : "PV_COUNT",
    KeySchema: [       
        { AttributeName: "pv_distinguish", KeyType: "HASH" }
    ],
    AttributeDefinitions: [       
        { AttributeName: "pv_distinguish", AttributeType: "S" }
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


var params = {
    TableName: "PV_COUNT",
    Item: {
        "pv_distinguish":"XXXXXXX",
        "pv_count":0
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


------

 set tuuid as a 


var params = {
    TableName: "User",
    AttributeDefinitions:[
        {AttributeName: "tuuid", AttributeType: "S"}
    ],
    GlobalSecondaryIndexUpdates: [
        {
            Create: {
                IndexName: "TuuidIndex",
                KeySchema: [
                    {AttributeName: "tuuid", KeyType: "HASH"},  //Partition key
                ],
                Projection: {
                    "ProjectionType": "ALL"
                },
                ProvisionedThroughput: {
                    "ReadCapacityUnits": 1,"WriteCapacityUnits": 1
                }
            }
        }
    ]
};

dynamodb.updateTable(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});


--
query by tuuid

var params = {
    TableName: "User",
    IndexName: "TuuidIndex",
    KeyConditionExpression: "tuuid = :tuuid_value",
    ExpressionAttributeValues: {
        ":tuuid_value": "57ee794c-ad70-4849-8cdf-3e2e006cf78d"
    },
    ProjectionExpression: "first_name, last_name, email"
};

docClient.query(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});