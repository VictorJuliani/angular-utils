import { Directive, NgZone, OnChanges, OnDestroy, ElementRef, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
// chart
import { createFromConfig, useTheme, unuseTheme } from '@amcharts/amcharts4/core';
import { Chart } from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
// models
import { ChartEntry } from '../models/entry.model';

@Directive({ selector: '[vbChart]' })
export class ChartDirective<T extends Chart> implements OnChanges, OnDestroy {
	@Input() type: new() => T;
	@Input() options: object;
	@Input() animated: boolean;
	@Input() data: ChartEntry<number | Date | string>[];

	@Output() chartUpdate = new EventEmitter<T>();

	public amChart: T;
	private drawing: boolean;

	constructor(private zone: NgZone, private element: ElementRef) {}

	ngOnDestroy() {
		if (this.amChart) {
			this.zone.runOutsideAngular(() => this.amChart.dispose());
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		if (!this.options) {
			return;
		}

		this.zone.runOutsideAngular(async () => {
			while (this.drawing) {
				await this.sleep(50);
			}

			this.drawing = true;
			if (changes.options) {
				this.createChart();
			}

			if (!this.amChart) {
				this.drawing = false;
				return;
			}

			if (changes.data) {
				this.amChart.data = this.data;
			}

			this.chartUpdate.emit(this.amChart);
			this.drawing = false;
		});
	}

	private createChart() {
		if (this.amChart) {
			this.amChart.dispose();
		}

		if (this.animated) {
			useTheme(am4themes_animated);
		} else {
			unuseTheme(am4themes_animated);
		}

		this.amChart = createFromConfig(this.options, this.element.nativeElement, this.type) as T;
	}

	private sleep(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}
