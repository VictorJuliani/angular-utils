// Page Objects
module.exports.PaginationTag = require('./src/e2e/po/pagination.po');
module.exports.TablePage = require('./src/e2e/po/table.po');
module.exports.SelectInput = require('./src/e2e/po/select-input.po');
module.exports.DateInput = require('./src/e2e/po/date-input.po');

// Utils
const utils = require('./src/e2e/util/testing.util');

module.exports.registerMatchers = require('./src/e2e/jasmine.matcher');
module.exports.hasClass = utils.hasClass;
module.exports.esc = utils.esc;

const patterns = require('./src/e2e/util/patterns.util');

module.exports.HEX = patterns.HEX;
module.exports.HEX_OR_DASH = patterns.HEX_OR_DASH;
module.exports.TID = patterns.TID;
module.exports.NUMBERS = patterns.NUMBERS;
module.exports.SHORT_DATE = patterns.SHORT_DATE;
module.exports.SHORT_DATE_TIME = patterns.SHORT_DATE_TIME;
module.exports.VBUID = patterns.VBUID;
