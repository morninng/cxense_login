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
        "email":"aa@bb"
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
query by tuuid and update primary table


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
    if (err){
        console.log(JSON.stringify(err, null, 2));
    }
    else{
        console.log("user is found")
        console.log(JSON.stringify(data, null, 2));
        var email_address = data.Items[0].email;
        if(email_address){
            console.log(email_address)
            update_name(email_address, "jijiji", "kokokoko")
        }
    }
});
function update_name(in_email, in_attr_name, in_attr_value){
    var params = {
        TableName: "User",
        Key: {
            "email":in_email
        },
        UpdateExpression: "SET #attribute_name = :attribute_value",
        ExpressionAttributeValues: { 
            ":attribute_value": in_attr_value
        },
        ExpressionAttributeNames: {
            "#attribute_name": in_attr_name
        },
        ReturnValues: "ALL_NEW"
    };
    docClient.update(params, function(err, data) {
        if (err)
            console.log(JSON.stringify(err, null, 2));
        else
            console.log(JSON.stringify(data, null, 2));
    });
}




//////////////update user data

// key is primary key

var params = {
    TableName: "User",
    Key: {
        "email":"aa@bb"
    },
    UpdateExpression: "SET first_name = :label",
    ExpressionAttributeValues: { 
        ":label": "oraoraora"
    },
    ReturnValues: "ALL_NEW"
};

docClient.update(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});

var params = {
    TableName: "User",
    Key: {
        "email":"aa@bb"
    },
    UpdateExpression: "SET #k = :label",
    ExpressionAttributeValues: { 
        ":label": "aaa"
    },
    ExpressionAttributeNames: {
        "#k": "asasas"
    },
    ReturnValues: "ALL_NEW"
};

docClient.update(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});



////////

 updating the data throuth global secondary index does not work
 we need to get the primary key through secondary index and 
  update the data of global data 

/*
var params = {
    TableName: "User",
    IndexName: "TuuidIndex",
    KeyConditionExpression: "tuuid = :tuuid_value",
    ExpressionAttributeValues: {
        ":tuuid_value": "57ee794c-ad70-4849-8cdf-3e2e006cf78d",
        ":label": "ZZZZZZZZZZZZZZZz"
    },
    UpdateExpression: "SET first_name = :label",
    ReturnValues: "ALL_NEW"
};

docClient.update(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});
*/

