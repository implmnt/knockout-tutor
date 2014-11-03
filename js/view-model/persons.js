function PersonsViewModel() {
	var self = this;
	var persons = {};
	function saveToLocalStorage() {
		localStorage.setItem('persons', ko.toJSON(self.personArray));
	}
	function getFromLocalStorage() {
		return JSON.parse(localStorage.getItem('persons')) || [];
	}
	function initialize(personArray) {
		ko.utils.arrayFirst(personArray(), function(person) {
			persons[person.id()] = person;
		});
		return personArray;
	}
	this.personArray = initialize(ko.mapping.fromJS(getFromLocalStorage()));
	this.personArray.deepSubscribe(saveToLocalStorage);
	this.person = ko.observable(this.personArray() && this.personArray()[0]);
	this.select = function() {
		self.person(this);
	}
	this.add = function(person) {
		person = ko.mapping.fromJS(person);
		var dummy = ko.observable({
			person : person
		});
		dummy.deepSubscribe(saveToLocalStorage);
		self.personArray.push(dummy().person);
		persons[dummy().person.id()] = dummy().person;
	}
	this.get = function(id) {
		return id in persons ? ko.toJS(persons[id]) : null;
	}
	this.update = function(update) {
		if (!update.id || !update.id in persons) return;
		var person = persons[update.id];
		update = ko.mapping.fromJS(update);
		Object.keys(person).map(function(property) {
			typeof person[property] === 'function' && person[property](
				update[property]())
		});
	}
}