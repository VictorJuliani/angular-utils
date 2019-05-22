module.exports.VBUID = function(type, length) {
	return new RegExp('^(' + type + ':)[a-fA-F0-9]{1,' + length + '}$');
}
module.exports.HEX = /^[a-fA-F0-9]+$/;
module.exports.HEX_OR_DASH = /^(-|[a-fA-F0-9]+)$/;
module.exports.TID = /^[0-9a-f]{12,64}$/;
module.exports.NUMBERS = /^\d+$/;

module.exports.SHORT_DATE = /^((([0-2][1-9]|3[01])\/(0?[1-9]|1[0-2])|(0?[1-9]|1[0-2])\/(0?[1-9]|[1-2][0-9]|3[01]))\/\d{2})$/;
module.exports.SHORT_DATE_TIME = /^((([0-2][1-9]|3[01])\/(0?[1-9]|1[0-2])|(0?[1-9]|1[0-2])\/(0?[1-9]|[1-2][0-9]|3[01]))\/\d{2}), (((0?[1-9]|1[0-2]):[0-5]\d [AP]M)|(((0?|1)\d|2[0-3]):[0-5]\d))$/;
