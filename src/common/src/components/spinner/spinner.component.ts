import { Component, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'vb-spinner',
	templateUrl: 'spinner.component.html',
	styleUrls: [ 'spinner.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent implements OnChanges
{
	@Input() subscription: Subscription;
	@Input() loading: boolean;
	@Input() size: 4;

	enable: boolean;
	private disable = () => { this.show(false); };

	ngOnChanges()
	{
		if (this.subscription) {
			this.show(true);

			new Promise(resolve => this.subscription.add(resolve))
				.then(this.disable)
				.catch(this.disable);
		} else {
			this.show(this.loading);
		}
	}

	public show(show: boolean): void
	{
		this.enable = show;
	}
}
