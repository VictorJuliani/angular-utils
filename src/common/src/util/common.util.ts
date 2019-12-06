/**
 * Creates a copy of the given object without the specified property.
 *
 * @param obj the source object
 * @param property the property to remove
 *
 * @returns the filtered object
 */
export function removeProperty<T>(obj: T, property: string): T {
	return Object.keys(obj)
		.reduce((value, key) =>
			(key !== property) ? { ...value, [key]: obj[key] } : value,
		{}) as T;
}

/**
 * Immutably removes an item from the array.
 *
 * @param arr the source array
 * @param index the index to remove
 *
 * @return a new array without the entry
 */
export function removeItem(arr: any[], index: number) {
	return arr.slice(0, index).concat(arr.slice(index + 1));
}

/**
 * Converts an array to a key-value object using the given key as index.
 *
 * @param arr the array to convert
 * @param key the array-item key to use as map key
 *
 * @returns the key-value object
 */
export function arrayToMap<T>(arr: T[], key: keyof T): { [key: number]: T } {
	return arr.reduce((map, entry) => {
		map[entry[key] as unknown as string] = entry;
		return map;
	}, {});
}

/**
 * Converts a key-value object to a flat array.
 *
 * @param map the map to convert
 *
 * @returns the array
 */
export function mapToArray<T>(map: { [key: number]: T }): T[] {
	return Object.keys(map).map(key => map[key]);
}

/**
 * Searches deeply for a property in an object using '.' as separator.
 *
 * @param obj the source object
 * @param pathString the property
 *
 * @returns the target property or null
 */
export function getPropertyByPath<T>(obj: T, pathString: string) {
	return pathString.split('.')
		.reduce((o, i) => (o && o[i] ? o[i] : null), obj);
}

/**
 * Searches deeply for a property in an object using '.' as separator.
 *
 * @param obj the source object
 * @param pathString the property
 *
 * @returns the target property or null
 */
export function setPropertyByPath<T>(obj: T, pathString: string, value: any) {
	const keys = pathString.split('.');

	for (let i = 0; i < keys.length; i++) {
		if (i === (keys.length - 1)) {
			obj[keys[i]] = value;
		} else if (obj[keys[i]]) {
			obj = obj[keys[i]];
		} else {
			break;
		}
	}
}

/**
 * Checks if a value is an absolute infinity.
 *
 * @param value the value to check
 *
 * @returns true if the value is an infinity.
 */
export function isInfinity(value: number) {
	return Infinity === Math.abs(value);
}

/**
 * Converts radians to degrees.
 *
 * @param rad the radians to convert
 *
 * @returns the degree value
 */
export function toDegree(rad: number) {
	return (180 * rad) / Math.PI;
}

/**
 * Converts degrees to radians.
 * If degree is an inifinity, results in 0.
 *
 * @param degree the degrees to convert
 *
 * @returns the radians value
 */
export function toRad(degree: number) {
	if (isInfinity(degree)) {
		degree = 0;
	}

	return degree * Math.PI / 180;
}

/**
 * Get the UNIX Timestamp of a given date.
 *
 * @param date the date to convert
 *
 * @returns the seconds of the date
 */
export function dateToSeconds(date: Date) {
	return date.getTime() / 1000;
}

export function hasArrayChanged(oldArr: any[], newArr: any[]): boolean {
	if (!oldArr && !newArr) {
		return false;
	} else if ((oldArr && !newArr) || (!oldArr && newArr)) {
		return true;
	} else if ((!oldArr.length && newArr.length) || (oldArr.length && !newArr.length)) {
		return true;
	}

	return false;
}

export function generateRandomString(size: number) {
	const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;

	let result           = '';
	for (let i = 0; i < size; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}