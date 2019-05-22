function asArray(obj) {
	return Array.isArray(obj) ? obj : [ obj ];
}

const toMatchAll = function() {
	jasmine.addMatchers({
		toMatchAll: function() {
			return {
				compare: function(actual, expected) {
					if (typeof expected === 'string') {
						expected = new RegExp(expected);
					}

					const entries = asArray(actual);
					const passed = entries.find(e => !expected.test(e));
					
					return {
							pass: !passed,
							message: 'Expected ' + passed + ' ' + (!passed ? ' not ' : '') + 'to match ' + expected
					};
				}
			};
		}
	});
}

const toContainAny = function() {
	jasmine.addMatchers({
		toContainAny: function() {
			return {
				compare: function(actual, expected) {
					const possibilities = asArray(expected);
					const entries = asArray(actual);
					let passed = false;

					for (const possibility of possibilities) {
						passed = entries.includes(possibility);
						if (passed) {
							break;
						}
					}

					return {
							pass: passed,
							message: 'Expected [ ' + entries.join(', ') + ' ] ' + (passed ? ' not ' : '') + 'to contain any [ ' + possibilities.join(', ') + ' ]'
					};
				}
			};
		}
	});
}

const toContainAll = function() {
	jasmine.addMatchers({
		toContainAll: function() {
			return {
				compare: function(actual, expected) {
					const possibilities = asArray(expected);
					const entries = asArray(actual);
					let passed = true;

					for (const possibility of possibilities) {
						passed &= entries.includes(possibility);
					}

					return {
							pass: passed,
							message: 'Expected [ ' + entries.join(', ') + ' ] ' + (passed ? ' not ' : '') + 'to contain all [ ' + possibilities.join(', ') + ' ]'
					};
				}
			};
		}
	});
}

const toBeAnyOf = function() {
	jasmine.addMatchers({
		toBeAnyOf: function() {
			return {
				compare: function(actual, expected) {
					const possibilities = asArray(expected);
					const entries = asArray(actual);
					const passed = !entries.filter(e => !possibilities.includes(e)).length;

					return {
							pass: passed,
							message: 'Expected [ ' + entries.join(', ') + ' ] ' + (passed ? ' not ' : '') + 'to contain only [ ' + possibilities.join(', ') + ' ]'
					};
				}
			};
		}
	});
}

const toBeAllOf = function() {
	jasmine.addMatchers({
		toBeAllOf: function() {
			return {
				compare: function(actual, expected) {
					const possibilities = asArray(expected);
					const entries = asArray(actual);

					// if length is 0, then all values are inside the other array
					let passed = !entries.filter(e => !possibilities.includes(e)).length &&
												!possibilities.filter(p => !entries.includes(p)).length;

					return {
							pass: passed,
							message: 'Expected ' + (passed ? 'no' : 'an') + ' empty disjuction between [ ' + possibilities.join(', ') + ' ] and [ ' + entries.join(', ') + ' ]'
					};
				}
			};
		}
	});
}

const toBeAfterOrEqual = function () {
	jasmine.addMatchers({
		toBeAfterOrEqual: function () {
			return {
				compare: function(actual, expected) {
					expected.setHours(0, 0, 0, 0);

					const dates = asArray(actual);
					let passed = true;

					dates.map(date => {
						date = new Date(date);
						date.setHours(0, 0, 0, 0);

						return date;
					}).forEach(date => {
						passed &= date >= expected;
					});

					return {
						pass: passed,
						message: 'Expected ' + actual + (passed ? 'not' : '') + ' to be after or equal ' + expected
					}
				}
			}
		}
	});
}

const toBeBeforeOrEqual = function () {
	jasmine.addMatchers({
		toBeBeforeOrEqual: function () {
			return {
				compare: function(actual, expected) {
					expected.setHours(0, 0, 0, 0);

					const dates = asArray(actual);
					let passed = true;

					dates.map(date => {
						date = new Date(date);
						date.setHours(0, 0, 0, 0);

						return date;
					}).forEach(date => {
						passed &= date <= expected;
					});

					return {
						pass: passed,
						message: 'Expected ' + actual + (passed ? 'not' : '') + ' to be before or equal ' + expected
					}
				}
			}
		}
	});
}

const toBeAnyBefore = function() {
	jasmine.addMatchers({
		toBeAnyBefore: function() {
			return {
				compare: function(actual, expected) {
					expected.setHours(0, 0, 0, 0);
					const dates = asArray(actual)
						.map(date => {
							date = new Date(date);
							date.setHours(0, 0, 0, 0);

							return date;
						});

					const passed = !!dates.find(date => date < expected);

					return {
							pass: passed,
							message: 'Expected [ ' + dates.join(', ') + ' ] ' + (passed ? ' not ' : '') + ' to contain any before ' + expected
					};
				}
			};
		}
	});
}

const toBeAnyAfter = function() {
	jasmine.addMatchers({
		toBeAnyAfter: function() {
			return {
				compare: function(actual, expected) {
					expected.setHours(0, 0, 0, 0);
					const dates = asArray(actual)
						.map(date => {
							date = new Date(date);
							date.setHours(0, 0, 0, 0);

							return date;
						});

					const passed = !!dates.find(date => date > expected);

					return {
							pass: passed,
							message: 'Expected [ ' + dates.join(', ') + ' ] ' + (passed ? ' not ' : '') + ' to contain any after ' + expected
					};
				}
			};
		}
	});
}

const registerMatchers = function() {
	beforeEach(() => {
		toMatchAll();
		toContainAny();
		toContainAll();
		toBeAnyOf();
		toBeAllOf();
		toBeAfterOrEqual();
		toBeBeforeOrEqual();
		toBeAnyAfter();
		toBeAnyBefore();
	});
}

module.exports = registerMatchers;