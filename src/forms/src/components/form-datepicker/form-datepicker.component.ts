import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbInputDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'vb-form-datepicker',
	templateUrl: 'form-datepicker.component.html',
	styleUrls: [ 'form-datepicker.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormDatepickerComponent implements OnInit, OnChanges
{
	@Input() group: FormGroup;
	@Input() name: string;
	@Input() placeholder: string;
	@Input() minDate: Date;
	@Input() maxDate: Date;

	@ViewChild(NgbInputDatepicker) picker: NgbInputDatepicker;

	get control() {
		return this.group.controls[this.name];
	}

	ngMinDate: NgbDateStruct;
	ngMaxDate: NgbDateStruct;
	ngStartDate: NgbDateStruct;

	ngOnInit()
	{
		this.ngStartDate = this.getNgbDate(new Date());
	}

	ngOnChanges() {
		if (this.minDate) {
			this.ngMinDate = this.getNgbDate(this.minDate);
		} else {
			delete this.ngMinDate;
		}

		if (this.maxDate) {
			this.ngMaxDate = this.getNgbDate(this.maxDate);
		} else {
			delete this.ngMaxDate;
		}
	}

	toggle(): void
	{
		this.picker.toggle();
	}

	clear(): void
	{
		if (this.control.value) {
			this.control.reset();
		}

		this.picker.close();
	}

	private getNgbDate(date: Date) {
		return {
			year: date.getFullYear(),
			month: date.getMonth() + 1,
			day: date.getDate()
		};
	}
}
