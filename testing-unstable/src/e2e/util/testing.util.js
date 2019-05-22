const protractor = require('protractor');
const browser = protractor.browser;

module.exports.hasClass = function (element, cls) {
	return element.getAttribute('class').then(function (classes) {
			return classes.split(' ').indexOf(cls) !== -1;
	});
};

module.exports.esc = function () {
	browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
}

module.exports.enter = function () {
	browser.actions().sendKeys(protractor.Key.ENTER).perform();
}
