
declare module jasmine {
	interface Matchers<T> {
		/**
		 * Expects an array to match an expression.
		 */
		toMatchAll(expression: RegExp | Promise<RegExp>): boolean;

		/**
		 * Expects at least one element to be present in the array.
		 */
		toContainAny(items: any[] | any): boolean;

		/**
		 * Expects all elements to be present in the array.
		 */
		toContainAll(items: any[] | any): boolean;

		/**
		 * Expects elements to be composed by only this elements
		 * (but not necessarilly all of them).
		 */
		toBeAnyOf(items: any[] | any): boolean;

		/**
		 * Expects an empty disjuction between both arrays:
		 * All actual elements should be present at least once in expected elements
		 * and all expected elements should be present at least once in actual data.
		 */
		toBeAllOf(items: any[]): boolean;

		/**
		 * Expects an array of date strings to be after a date.
		 */
		toBeAfterOrEqual(date: Date): boolean;

		/**
		 * Expects an array of date strings to be before a date.
		 */
		toBeBeforeOrEqual(date: Date): boolean;

		/**
		 * Expects an array of date strings to be contain any value before a date.
		 */
		toBeAnyBefore(date: Date): boolean;

		/**
		 * Expects an array of date strings to be contain any value after a date.
		 */
		toBeAnyAfter(date: Date): boolean;
	}
}

