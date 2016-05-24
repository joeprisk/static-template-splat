(function() {

	'use strict';

	var routes = {};

	routes.layout   = layout;
	routes.partial  = partial;
	routes.modal    = modal;
	routes.notFound = notFound;

	module.exports = routes;

	function layout(request, response) {

		response.render('main');
	}

	function partial(request, response) {

		var controller = request.params.controller,
			action = request.params.action;

		response.render('partials/' + controller + '/' + action, {layout: false});
	}

	function modal(request, response) {

		var controller = request.params.controller,
			action = request.params.action;
		response.render('modals/' + controller + '/' + action, {layout: false});

	}

	function notFound(request, response) {

		response.status(404).sendFile(__dirname + '/views/404.handlebars');
	}

})();
