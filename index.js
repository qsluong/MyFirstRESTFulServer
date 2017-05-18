/**
 * Created by quocsyluong on 02-05-17.
 */

var config      = require('./config.json');
var http        = require('http');
var express     = require('express');

// Applicatie creëeren
var app = express();

// Middleware statische bestanden (HTML, CSS, images)
app.use(express.static(__dirname + '/public'));

// Routing with versions
// app.use('/apiv1', require("./routes/routes_apiv1" ));
app.use('/apiv2', require("./routes/routes_apiv2" ));
// app.use('/apiv3', require("./routes/routes_apiv3" ));

app.set('PORT', config.webPort);

app.all( '*', function( reg, res, next ) {
    console.log( JSON.stringify( req.headers ) );
    console.log( reg.method + " " + reg.url );
    // Next zorgt ervoor dat de request in de volgende 'knikkerbak' valt
    next();
});

var port = process.env.PORT || app.get('PORT');

/**
 * Dit is niet nodig. Wordt door APIv1 afgehandeld
app.get( '/api/v1/hello', function( reg, res, next ) {
    res.contentType( 'application/json' );
    res.json( { "msg": "Hello yo you all !! Have a nice NodeJS day.",
    "Temperatuur": [10, 20, 30, 40, 50, "Koud"]
    } );
})
 */

// Server starten
app.listen( 8000, function() {
    console.log( 'The magic happens at http://localhost:' + 8000 );
});