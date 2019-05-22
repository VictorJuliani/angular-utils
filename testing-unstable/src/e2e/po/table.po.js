const protractor = require('protractor');
const by = protractor.by;
const PaginationTag = require('./pagination.po');

function TablePage(table, pagination) {
	this.table = table;
	this.pagination = new PaginationTag(pagination);
}

/*************************************************************/
/********************** Column Helpers ***********************/
/*************************************************************/
TablePage.prototype.columnText = function (column) {
	return this.column(column, this.table).map(t => t.getText());
}

TablePage.prototype.columnContains = function (column, values) {
	expect(this.readPages(column)).toContain(values);
}

TablePage.prototype.columnContainsOnly = function (column, values) {
	expect(this.readPages(column)).toBeAnyOf(values);
}

TablePage.prototype.columnContainsAll = function (column, values) {
	expect(this.readPages(column)).toBeAllOf(values);
}

TablePage.prototype.columnMatches = function (column, regex) {
	expect(this.readPages(column)).toMatchAll(regex);
}

TablePage.prototype.columnAfter = function (column, date) {
	expect(this.readPages(column)).toBeAfterOrEqual(date);
}

TablePage.prototype.columnBefore = function (column, date) {
	expect(this.readPages(column)).toBeBeforeOrEqual(date);
}

TablePage.prototype.readPages = function (column) {
	return this.pagination.readPages(() => this.columnText(column));
}

TablePage.prototype.column = function (column) {
	const tags = this.table.all(by.css(`tbody tr > :nth-child(${column})`));

	expect(tags.count()).toBeGreaterThan(0);
	return tags;
}

TablePage.prototype.row = function (row) {
	return this.table.element(by.css(`tbody tr:nth-child(${row})`));
}

TablePage.prototype.cell = function (row, column) {
	return this.table.element(by.css(`tbody tr:nth-child(${row}) > :nth-child(${column})`));
}

TablePage.prototype.header = function (column) {
	return this.table.element(by.css(`thead th:nth-child(${row})`)).getText();
}

TablePage.prototype.headers = function () {
	return this.table.all(by.css(`thead th`)).map(h => h.getText());
}

/*************************************************************/
/****************** Filter Helpers ********************/
/*************************************************************/
TablePage.prototype.assertFilter = function (column, filter, index, option) {
	filter.clearSelections();
	filter.selectItem(index);
	this.pagination.firstPage();
	this.columnMatches(column, option);
}

TablePage.prototype.assertFilters = function (column, filter, options, indexes) {
	options.forEach((o, i) => {
		if (!indexes || indexes.includes(i + 1)) {
			this.assertFilter(column, filter, i + 1, o)
		}
	});
}

TablePage.prototype.assertArrayFilters = function (column, filter, indexes, options) {
	filter.clearSelections();
	
	const filteredOptions = [];
	indexes
		.slice(0, 2) // get only first 2 indexes
		.forEach(i => {
			filter.selectItem(i);
			filteredOptions.push(options[i - 1]);
		});

	this.pagination.firstPage();
	this.columnContainsAll(column, filteredOptions);

	// remove first filter
	filter.deselectItem(1);
	this.pagination.firstPage();

	this.columnContainsAll(column, filteredOptions.slice(1));
}

TablePage.prototype.testFilter = function (column, filter, indexes) {
	filter.listOptions().then(options => {
		options = options.map(o => o === 'None' ? '-' : o);

		this.assertFilters(column, filter, options, indexes);
		this.assertArrayFilters(column, filter, indexes || [ 1, 2 ], options);
	});
}

module.exports = TablePage;
