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
    TableName: "sessions"
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
        "detail":"this is the first album",
        "genre":"Country",
        "Price":100
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
        "detail":"this is the first album",
        "genre":"Country",
        "Price":200
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
        "detail":"this is the second album",
        "genre":"Popular",
        "Price":200
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
        "detail":"oretachi",
        "genre":"Jpop",
        "Price":500
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

--
var params = {
    TableName: "Users",
    Item: {
        "email":"moriyama_yuuta@hotmail.com",
        "first_name":"yuta",
        "last_name":"moriyama",
        "age":1,
        "hashed_password":"lll"
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
    TableName: "Music"
};

docClient.scan(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err));
    else
        console.log(JSON.stringify(data));
});

-- 
Scan partial data

 var params = {
    TableName: "User"
};

docClient.scan(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err));
    else
        console.log(JSON.stringify(data));
});

-------------delete table---------

var params = {
    TableName: "Music"
};

dynamodb.deleteTable(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});

--
var params = {
    TableName: "PV_COUNT"
};

dynamodb.deleteTable(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});



----------------------------------
add secondary index to user

-
create secondary index



var params = {
    TableName: "Music",
    AttributeDefinitions:[
        {AttributeName: "genre", AttributeType: "S"},
        {AttributeName: "Price", AttributeType: "N"}
    ],
    GlobalSecondaryIndexUpdates: [
        {
            Create: {
                IndexName: "GenreAndPriceIndex",
                KeySchema: [
                    {AttributeName: "genre", KeyType: "HASH"},  //Partition key
                    {AttributeName: "Price", KeyType: "RANGE"},  //Sort key
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
query with secondary index

https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/gettingstartedguide/GettingStarted.JsShell.06.html


var params = {
    TableName: "Music",
    IndexName: "GenreAndPriceIndex",
    KeyConditionExpression: "genre = :genre",
    ExpressionAttributeValues: {
        ":genre": "Country"
    },
    ProjectionExpression: "songTitle, Price, artist"
};

docClient.query(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});



quer with ConditionExpression


var params = {
    TableName: "Music",
    IndexName: "GenreAndPriceIndex",
    KeyConditionExpression: "genre = :genre and Price > :price",
    ExpressionAttributeValues: {
        ":genre": "Country",
        ":price": 20
    },
    ProjectionExpression: "songTitle, Price"
};
docClient.query(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});




--

scan with secondary index

var params = {
    TableName: "Music",
    IndexName: "GenreAndPriceIndex",
    ProjectionExpression: "Genre, Price, SongTitle, Artist, AlbumTitle"
};

docClient.scan(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});

