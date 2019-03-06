import { RequestError } from '../../models/request-error.interface';

export enum ErrorActionTypes {
	SET_ERROR = '[APP] Set Error',
	CLEAR_ERROR = '[APP] Clear Error',
	CLEAR_ERRORS = '[APP] Clear Errors',
	SET_ERROR_LISTENER = '[APP] Set Error Listener',
	DROP_ERROR_LISTENER = '[APP] Drop Error Listener',
}

export class SetError {
	static readonly type = ErrorActionTypes.SET_ERROR;
	constructor(public error: string | RequestError, public key: string = 'root') {}
}

export class ClearError {
	static readonly type = ErrorActionTypes.CLEAR_ERROR;
	constructor(public key: string = 'root') {}
}

export class ClearErrors {
	static readonly type = ErrorActionTypes.CLEAR_ERRORS;
}

export class SetErrorListener {
	static readonly type = ErrorActionTypes.SET_ERROR_LISTENER;
	constructor(public keys: string[]) {}
}

export class DropErrorListener {
	static readonly type = ErrorActionTypes.DROP_ERROR_LISTENER;
	constructor(public keys: string[]) {}
}
