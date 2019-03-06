const protractor = require('protractor');
const by = protractor.by;
const util = require('../util/testing.util');

function DateInput(input) {
	this.input = input;
}

DateInput.prototype.open = function () {
	util.esc();
	this.input.element(by.css('.calendar')).click(); // open calendar
}

DateInput.prototype.selectDate = function (date) {
	this.open();
	if (!date) {
		date = new Date();
	}

	date.setHours(0, 0, 0, 0);

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	// if selecting today...
	let filter = 'text-muted'; // do not search for text-muted
	let method = 'first'; // and get first result

	// if selecting future date
	if (date > today) {
		filter = 'disabled'; // avoid disabled dates

		// get last date if it's another month
		if (date.getMonth() > today.getMonth()) {
			method = 'last';
		}
	} else if (date < today) {
		filter = 'disabled'; // get first date and avoid disabled dates
	}

	this.input
		.all(by.xpath(`.//div[contains(@class, "ngb-dp-day") and .//div[not(contains(@class, '${filter}')) and text() = "${date.getDate()}"]]`))
		[method]() // first or last
		.click();
}

DateInput.prototype.deselectDate = function () {
	this.input.element(by.css('.clear')).click();
}

module.exports = DateInput;