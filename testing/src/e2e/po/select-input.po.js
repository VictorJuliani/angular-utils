const protractor = require('protractor');
const by = protractor.by;
const util = require('../util/testing.util');

function SelectInput(input) {
	this.input = input;
}

SelectInput.prototype.open = function () {
	util.esc();
	this.input.element(by.css(':scope > div')).click();
}

SelectInput.prototype.listOptions = function () {
	this.open();
	return this.input.all(by.css(`ul li`)).map(f => f.getText());
}

SelectInput.prototype.selectItem = function (pos) {
	this.open();
	this.input.element(by.css(`ul li:nth-child(${pos})`)).click();
}

SelectInput.prototype.deselectItem = function (pos) {
	util.esc();
	this.input.element(by.css(`.multiple > .option:nth-child(${pos}) > .deselect-option`)).click();
}

SelectInput.prototype.clearSelections = function () {
	util.esc();
	this.input.all(by.css('.multiple .deselect-option')).each(f => f.click());
}

module.exports = SelectInput;