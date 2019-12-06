import { Observable, defer } from 'rxjs';

/**
 * Example:
 * import {from} from 'rxjs/observable/from';
 * from([1, 2, 3])
 * 	.pipe(doOnSubscribe(() => console.log('subscribed to stream')))
 * 	.subscribe(x => console.log(x), null, () => console.log('completed'));
 */
export function doOnSubscribe<T>(onSubscribe: () => void): (source: Observable<T>) =>  Observable<T> {
	return function inner(source: Observable<T>): Observable<T> {
		return defer(() => {
			onSubscribe();
			return source;
		});
	};
}
