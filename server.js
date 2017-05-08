
// Dependencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var favicon = require('serve-favicon');

// Set up Express app
var app = express();
app.set('port', process.env.PORT || 8080);
// var port = process.env.PORT || 8080;

// database models for syncing
var db = require("./models");

// Serve static content
app.use(express.static(process.cwd() + '/public'));
// Serve static files in the public directory
//app.use(express.static(path.join(__dirname, 'public')));


// Set up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// set handlebars
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// favicon in /public
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));

// require Routes with app.use
// app.use(require('./controllers'));
app.use(require('./controllers/trekmate_controller'));
app.use(require('./controllers/api_user'));
app.use(require('./controllers/api_flight'));

// Syncing our sequelize models and then starting our express app
// force: true to allow structure modifications in our database,
// this is the case with associations

db.sequelize.sync({ force: true }).then(function () {
    var server = app.listen(app.get('port'), function () {
        console.log('Listening on port ' + app.get('port'));
    });
});
