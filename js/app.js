var app = app || {};

	app.persons = new PersonsViewModel();
	ko.applyBindings(app.persons);
