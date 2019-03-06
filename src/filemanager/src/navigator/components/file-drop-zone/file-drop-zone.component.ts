import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'vb-file-drop-zone',
	templateUrl: 'file-drop-zone.component.html',
	styleUrls: [ 'file-drop-zone.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileDropZoneComponent {
	dragenter(event: DragEvent) {
		return true;
	}

	dragleave(event: DragEvent) {
		if (event.target['classList']) {
			event.target['classList'].remove('valid-drag');
		}
		event.preventDefault();
		return true;
	}

	dragover(event: DragEvent) {
		if (event.target['classList']) {
			event.target['classList'].add('valid-drag');
		}
		event.preventDefault();
		return true;
	}

	onDrop(event: DragEvent) {
		if (event.target['classList']) {
			event.target['classList'].remove('valid-drag');
		}
	}
}
