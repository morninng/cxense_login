---------------------------------
(1) create user table

 primary key: emailaddress

 no range key is ncessary because email address is already unique to identify person


 var params = {
    TableName : "Music",
    KeySchema: [       
        { AttributeName: "artist", KeyType: "HASH" },
        { AttributeName: "songTitle", KeyType: "RANGE" }
    ],
    AttributeDefinitions: [       
        { AttributeName: "artist", AttributeType: "S" },
        { AttributeName: "songTitle", AttributeType: "S" }
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
    TableName: "Books"
};
dynamodb.describeTable(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err));
    else
        console.log(JSON.stringify(data));
});



-------------------------------

(2)put music data on the table


var params = {
    TableName: "Music",
    Item: {
        "artist":"utada hikaru",
        "songTitle":"tell me",
        "detail":"this is the first album"
    },
    "ConditionExpression": "attribute_not_exists(artist) and attribute_not_exists(songTitle)"
};
docClient.put(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err));
    else
        console.log(JSON.stringify(data));
});

var params = {
    TableName: "Music",
    Item: {
        "artist":"utada hikaru",
        "songTitle":"again",
        "detail":"this is the first album"
    },
    "ConditionExpression": "attribute_not_exists(artist) and attribute_not_exists(songTitle)"
};
docClient.put(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err));
    else
        console.log(JSON.stringify(data));
});
--                                                                                                                                                                                                                                   
var params = {
    TableName: "Music",
    Item: {
        "artist":"utada hikaru",
        "songTitle":"ashita",
        "detail":"this is the second album"
    },
    "ConditionExpression": "attribute_not_exists(artist) and attribute_not_exists(songTitle)"
};
docClient.put(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err));
    else
        console.log(JSON.stringify(data));
});
--
var params = {
    TableName: "Music",
    Item: {
        "artist":"smap",
        "songTitle":"himawari",
        "detail":"oretachi"
    },
    "ConditionExpression": "attribute_not_exists(artist) and attribute_not_exists(songTitle)"
};
docClient.put(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err));
    else
        console.log(JSON.stringify(data));
});


--
var params = {
    TableName: "Movies",
    Item: {
        "year":2013,
        "title":"himawari",
        info: {
            rating: 0
        }
    }
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
    TableName: "Music",
    Key: {
        "artist":"utada hikaru",
        "songTitle":"tell me"
    }
};

docClient.get(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err));
    else
        console.log(JSON.stringify(data));
});
-------
var params = { 
    TableName: "Books",
    Key: {
        "title": "thw ban tobacco",
        "author": "Miyamura yasushi",
    }
};

docClient.get(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err));
    else
        console.log(JSON.stringify(data));
});


-------
var params = { 
    TableName: "Movies",
    Key: {
        "title": "himawari",
        "year": 2013,
    }
};

docClient.get(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err));
    else
        console.log(JSON.stringify(data));
});


-----
retrieve only detail

var params = { 
    TableName: "Music",
    Key: {
        "artist":"utada hikaru",
        "songTitle":"tell me"
    },
    ProjectionExpression: "detail"
};

docClient.get(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err));
    else
        console.log(JSON.stringify(data));
});
---------------------------------------------
(3) search user by query

query with 

var params = {
    TableName: "Music",
    KeyConditionExpression: "artist = :ss",
    ExpressionAttributeValues: {
        ":ss": "utada hikaru"
    }
};

docClient.query(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err));
    else
        console.log(JSON.stringify(data));
});

----
 query with attribute

var params = {
    TableName: "Music",
    KeyConditionExpression: "artist= :ss and begins_with(songTitle, :letter)",
    ExpressionAttributeValues: {
        ":ss": "utada hikaru",
        ":letter": "a"
    }
};

docClient.query(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err));
    else
        console.log(JSON.stringify(data));
});


----------------
 Scan all the data

 var params = {
    TableName: "Books"
};

docClient.scan(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err));
    else
        console.log(JSON.stringify(data));
});

