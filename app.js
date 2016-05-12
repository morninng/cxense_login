var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');

var routes = require('./routes/index_router');
var users = require('./routes/users_router');
var config_common = require('./src/config_common.conf')
var ECT = require('ect');
var app = express();


/* this part is for dynamodb session */

var dynamo = require('./src/dynamo');
var aws_client = dynamo.aws_client;
var DynamoDBStore = require('connect-dynamodb')({session: session});
 var store = new DynamoDBStore({client: aws_client});


/*************/

/* this part is for mongodb session */
/*
  var MongoDBStore = require('connect-mongodb-session')(session);
  var store = new MongoDBStore({ 
    uri: 'mongodb://localhost:27017/cxense',
    collection: 'Sessions'
  });
  */
  /******/


  store.on('error', function(error) {
    assert.ifError(error);
    assert.ok(false);
  });

  app.use(require('express-session')({
    secret: 'morninng',
    cookie: {
      maxAge: config_common.session_maxage
    },
    store: store
  }));



// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.engine('ect', ECT({ watch: true, root: __dirname + '/views', ext: '.ect' }).render);
app.set('view engine', 'ect');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
var tuuid = require('./src/tuuid.js');
app.use(tuuid.set_tuuid);
*/

var pv = require('./src/pv.js');
app.use(pv.count);



app.use('/', routes);
app.use('/users', users);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
