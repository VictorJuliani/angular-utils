import { Pipe, PipeTransform, Inject } from '@angular/core';
import { NFMConfig, FileManagerConfig } from '../../shared/models/config.model';

@Pipe({ name: 'fileSize' })
export class FileSizePipe implements PipeTransform
{
	readonly decimalByteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
	readonly binaryByteUnits = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

	constructor(@Inject(NFMConfig) private config: FileManagerConfig) {}

	transform(value: number)
	{
		// See https://en.wikipedia.org/wiki/Binary_prefix
		let i = -1;
		let fileSizeInBytes = value;

		do {
			fileSizeInBytes = fileSizeInBytes / 1024;
			i++;
		} while (fileSizeInBytes > 1024);

		const result = this.config.useBinarySizePrefixes ? this.binaryByteUnits[i] : this.decimalByteUnits[i];
		return Math.max(fileSizeInBytes, 0.1).toFixed(1) + ' ' + result;
	}
}
