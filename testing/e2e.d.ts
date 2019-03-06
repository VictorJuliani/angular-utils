import { ElementFinder, ElementArrayFinder, promise } from 'protractor';

export declare class PaginationTag {
	tag: ElementFinder;

	constructor(tag: ElementFinder);

	nextPage(): void;
	firstPage(): void;
	hasNextPage(): promise.Promise<boolean>;
	readPages(reader: Function, firstPage?: boolean): promise.Promise<string[]>;
	testChangePage(reader: Function): void;
}

export declare class TablePage {
	table: ElementFinder;
	pagination: PaginationTag;

	constructor(table: ElementFinder, pagination: ElementFinder);

	columnText(column: number): promise.Promise<string[]>;
	columnContains(column: number, value: string): void;
	columnContainsOnly(column: number, values: string[]): void;
	columnContainsAll(column: number, values: string[]): void;
	columnMatches(column: number, regex: RegExp): void;
	columnAfter(column: number, date: Date): void;
	columnBefore(column: number, date: Date): void;
	readPages(column: number): promise.Promise<string[]>;

	column(column: number): ElementArrayFinder;
	row(row: number): ElementFinder;
	cell(row: number, column: number): ElementFinder;
	header(column: number): ElementArrayFinder;
	headers(): promise.Promise<string[]>;

	assertFilter(column: number, filter: SelectInput, index: number, option: string): void;
	assertFilters(column: number, filter: SelectInput, options: string[], indexes?: number[]): void;
	assertArrayFilters(column: number, filter: SelectInput, indexes: number[], options: string[]): void;
	testFilter(column: number, filter: SelectInput, indexes?: number[]): void;
}

export declare class SelectInput {
	input: ElementFinder;

	constructor(input: ElementFinder);

	open(): ElementFinder;
	listOptions(): promise.Promise<string[]>;
	selectItem(pos: number): void;
	deselectItem(pos: number): void;
	clearSelections(): void;
}

export declare class DateInput {
	input: ElementFinder;

	constructor(input: ElementFinder);

	open(): ElementFinder;
	selectDate(date?: Date): void;
	deselectDate(): void;
}

export declare function hasClass(element: ElementFinder, clazz: string): boolean;
export declare function esc(): void;
export declare function enter(): void;

export declare const NUMBERS: RegExp;
export declare const HEX: RegExp;
export declare const HEX_OR_DASH: RegExp;
export declare const TID: RegExp;
export declare const SHORT_DATE: RegExp;
export declare const SHORT_DATE_TIME: RegExp;
