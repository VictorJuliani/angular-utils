const protractor = require('protractor');
const by = protractor.by;
const util = require('../util/testing.util');

function PaginationTag(tag) {
	this.tag = tag;
}

PaginationTag.prototype.nextPage = function () {
	this.tag.element(by.css('li:nth-last-child(2)')).click();
}

PaginationTag.prototype.firstPage = function () {
	this.tag.element(by.css('li:first-child')).click();
}

PaginationTag.prototype.hasNextPage = function () {
	const next = this.tag.element(by.css('li:nth-last-child(2)'));
	return util.hasClass(next, 'disabled')
		.then(lastPage => !lastPage);
}

PaginationTag.prototype.readPages = function (reader, firstPage = true) {
	if (firstPage) {
		util.esc();
		this.firstPage();
	}

	const next = this.tag.element(by.css('li:nth-last-child(2)'));

	// check if we're in last page
	return util.hasClass(next, 'disabled')
		.then(lastPage => {
			const rows = reader();

			// if not in last page
			if (!lastPage) {
				return rows // first read current page's items
					.then(items => {
						next.click(); // then go to next page
						return this.readPages(reader, false)
							.then(newItems => items.concat(newItems)); // and merge pages items
					})
			}

			// last page, just return the items
			return rows;
		});
}

PaginationTag.prototype.testChangePage = function (reader) {
	const pageOne = reader();

	pageOne.then(items => {
		this.nextPage();

		const pageTwo = reader();
		expect(pageTwo).not.toBeAnyOf(items);
	});
}

module.exports = PaginationTag;
