import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef, HostListener, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// services
import { AlertService, Translation } from '@vonbraunlabs/alert';
import { NavigatorService } from '../../../shared/services/navigator.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'vb-modal',
	templateUrl: 'modal.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnDestroy
{
	@Input() title: string;
	@Input() disabled: boolean;
	@Input() canSubmit = true;
	@Input() showSpinner = true;
	@Input() refreshOnClose = false;
	@Output() submit = new EventEmitter<void>();

	task$$: Subscription;
	err: string;
	get loading() {
		return this.task$$ && !this.task$$.closed;
	}

	constructor(
		private navigator: NavigatorService,
		private alert: AlertService,
		private modal: NgbActiveModal,
		private cdr: ChangeDetectorRef
	) {}

	ngOnDestroy() {
		this.cancel();
	}

	cancel() {
		if (this.task$$) {
			this.task$$.unsubscribe();
		}

		this.cdr.markForCheck();
	}

	dismiss() {
		this.cancel();
		this.modal.dismiss();
	}

	close(message: Translation | false, result?: any) {
		if (message) {
			this.alert.toastrSuccess(message);
		}

		if (message || this.refreshOnClose) {
			this.navigator.refresh();
		}

		this.cancel();
		this.modal.close(result);
	}

	error(value: string | undefined, toast?: boolean) {
		if (value && toast) {
			this.alert.toastrError({ message: value });
		}

		this.err = value;
		this.cdr.markForCheck();
	}

	toast(value: Translation) {
		this.alert.toastrError(value);
	}

	saveTask(task: Subscription) {
		this.task$$ = task;
		// this.cdr.markForCheck();
	}

	@HostListener('keydown.enter')
	doSubmit() {
		
		if (this.disabled) {
			return;
		}

		this.submit.emit();
	}
}
