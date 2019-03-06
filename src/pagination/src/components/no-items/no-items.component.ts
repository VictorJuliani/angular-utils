import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'vb-no-items',
	styleUrls: [ 'no-items.component.scss' ],
	templateUrl: 'no-items.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoItemsComponent
{
	@Input() loading = true; // whether to display loading spinner or not
	@Input() isolate = true; // whether isolate message with borders or not
	@Input() message: string; // the message to display
}
