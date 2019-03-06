import { HttpErrorResponse } from '@angular/common/http';

export type KeyError = (BasicError & { identifiers: string[] });

export interface ErrorDetail
{
	variable: string;
	properties?: string[];
}

export interface BasicError
{
	code: number;
	message: string;
}

export interface ServerError extends BasicError
{
	identifiers?: (string | KeyError)[];
}

export interface RequestError extends BasicError
{
	status: number;
	raw?: HttpErrorResponse;
	identifiers?: ErrorDetail[];
	keys?: KeyError[];
	stored?: boolean;
}
