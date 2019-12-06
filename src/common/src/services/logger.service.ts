/**
 * The possible log levels.
 * LogLevel.Off is never emitted and only used with Logger.level property to disable logs.
 */
export enum LogLevel {
	Off = 0,
	Error,
	Warning,
	Info,
	Debug,
	Trace
}

/**
 * Log output handler function.
 */
export type LogOutput = (source: string | undefined, level: LogLevel, ...objects: any[]) => void;

/**
 * Simple logger system with the possibility of registering custom outputs.
 *
 * 4 different log levels are provided, with corresponding methods:
 * - trace   : for trace information (will appear on console as debug)
 * - debug   : for debug information
 * - info    : for informative status of the application (success, ...)
 * - warning : for non-critical errors that do not prevent normal application behavior
 * - error   : for critical errors that prevent normal application behavior
 *
 * Example usage:
 * ```
 * import { Logger } from '@core';
 *
 * const log = new Logger('MyComponent');
 * ...
 * log.debug('something happened');
 * ```
 *
 * To disable debug and info logs in production, add this snippet to your root component:
 * ```
 * export class AppComponent implements OnInit {
 *   ngOnInit() {
 *     if (environment.production) {
 *       Logger.enableProductionMode();
 *     }
 *     ...
 *   }
 * }
 *
 */
export class LogManager {
	/**
	 * LogManager cache to reuse same-tag instances.
	 */
	private static loggers: { [key: string]: LogManager } = {};

	/**
	 * Current logging level.
	 * Set it to LogLevel.Off to disable logs completely.
	 */
	private static level = LogLevel.Debug;

	constructor(private source?: string) {}

	/**
	 * Logs messages or objects  with the trace level.
	 */
	trace(...objects: any[]) {
		this.log(console.log, LogLevel.Trace, objects);
	}

	/**
	 * Logs messages or objects  with the debug level.
	 * Works the same as console.log().
	 */
	debug(...objects: any[]) {
		this.log(console.log, LogLevel.Debug, objects);
	}

	/**
	 * Logs messages or objects  with the info level.
	 * Works the same as console.log().
	 */
	info(...objects: any[]) {
		this.log(console.info, LogLevel.Info, objects);
	}

	/**
	 * Logs messages or objects  with the warning level.
	 * Works the same as console.log().
	 */
	warn(...objects: any[]) {
		this.log(console.warn, LogLevel.Warning, objects);
	}

	/**
	 * Logs messages or objects  with the error level.
	 * Works the same as console.log().
	 */
	error(...objects: any[]) {
		this.log(console.error, LogLevel.Error, objects);
	}

	private log(func: () => void, level: LogLevel, objects: any[]) {
		if (level <= LogManager.level) {
			const log = this.source ? ['[' + this.source + ']'].concat(objects) : objects;
			func.apply(console, log);
		}
	}

	/**
	 * Enables production mode.
	 * Sets logging level to LogLevel.Warning.
	 */
	public static enableProductionMode() {
		LogManager.level = LogLevel.Warning;
	}

	public static tag(source: string) {
		const logger = LogManager.loggers[source];
		return logger || (LogManager.loggers[source] = new LogManager(source));
	}
}

/**
 * Default LogManager with no tag specified.
 */
export const Logger = new LogManager();
