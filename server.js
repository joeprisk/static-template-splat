'use strict';

var express = require('express'),
	exphbs  = require('express-handlebars'),
	app     = express(),
	routes  = require('./routes');

var hbs = exphbs.create({
	defaultLayout: 'main',

	// Uses multiple partials dirs, templates in "shared/templates/" are shared
	// with the client-side of the app (see below).
	partialsDir: [
		'shared/'
	]
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', routes.layout);
app.get('/partial/:controller/:action', exposeTemplates, routes.partial);
app.get('/modal/:controller/:action', exposeTemplates, routes.modal);
app.get('/*', routes.notFound);
app.listen(8080, start);


function exposeTemplates(req, res, next) {
	// Uses the `ExpressHandlebars` instance to get the get the **precompiled**
	// templates which will be shared with the client-side of the app.
	hbs.getTemplates('shared/templates/', {
		cache      : app.enabled('view cache'),
		precompiled: true
	}).then(function (templates) {

		setImmediate(next);
	})
		.catch(next);
}

function start() {
	// do some start up stuff
	console.log('template spitter has started');
}