export interface StringFilter
{
	[key: string]: string | string[];
}

/**
 * Covert an object of objects to object of strings.
 *
 * @example toFilterString(filter, { 'status': TagStatus })
 *
 * @param filter the filter to convert
 * @param specials an object with enum mapping
 *
 * @returns the string filter or undefined if no filter
 */
export function toFilterString(filter: any, specials?: { [key: string]: any }): StringFilter | undefined
{
	if (!filter) {
		return undefined;
	}

	const result: StringFilter = {};

	Object.keys(filter).forEach(key => {
		if (filter[key] instanceof Array) {
			if (filter[key].length) {
				if (specials && specials[key]) {
					result[key] = enumToStringArray(filter[key], specials[key]);
				} else {
					result[key] = filter[key].filter(isDefined).map((value: any) => value.toString());
				}
			}
		} else if (filter[key] instanceof Date) {
			result[key] = filter[key].toISOString();
		} else if (isDefined(filter[key])) {
			result[key] = filter[key].toString();
		}
	});

	return result;
}

/**
 * Convert a generic enum array to string array.
 *
 * @param array the enum objects array
 * @param type the enum type
 *
 * @returns the string array
 */
export function enumToStringArray<T>(array: T[], type: any): string[]
{
	const values = new Array<string>(array.length);

	for (let i = 0; i < array.length; i++) {
		const item = array[i];
		values[i] = ((typeof item === 'number' ? type[item] : item).toLowerCase());
	}

	return values;
}

function isDefined(value: any): boolean
{
	return value !== undefined && value !== null;
}
