import { Datapoint } from './datapoint.model';

export interface Dataset {
	id: string;
	datapoints: Datapoint[];
	color: string;
}
