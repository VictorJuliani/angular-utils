import { color as amColor, ListTemplate, Scrollbar, ColorSet } from '@amcharts/amcharts4/core';
import { SerialChart, PieSeries, LineSeries, ColumnSeries, Series } from '@amcharts/amcharts4/charts';
import { ChartEntry } from '../models/entry.model';

export const COLORS = {
	green: 'rgba(60, 180, 75, 0.5)',
	blue: 'rgba(0, 130, 200, 0.5)',
	red: 'rgba(230, 25, 75, 0.5)',
	yellow: 'rgba(255, 225, 25, 0.5)',
	purple: 'rgba(145, 30, 180, 0.5)',
	orange: 'rgba(245, 130, 48, 0.5)',
	cyan: 'rgba(70, 240, 240, 0.5)',
	lime: 'rgba(210, 245, 60, 0.5)',
	magenta: 'rgba(240, 50, 230, 0.5)',
	pink: 'rgba(250, 190, 190, 0.5)',
	teal: 'rgba(0, 128, 128, 0.5)',
	lavender: 'rgba(230, 190, 255, 0.5)',
	mint: 'rgba(170, 255, 195, 0.5)',
	olive: 'rgba(128, 128, 0, 0.5)',
	navy: 'rgba(0, 0, 128, 0.5)'
};

export const DUMMY_ENTRY = {
	label: 'Dummy',
	disabled: true,
	value: 1000,
	color: '#bababa',
	opacity: 0.8,
	strokeDasharray: '4,4',
	tooltip: ''
};

export class ChartUtil {

	public static lineSeries(id: string, color: string, data: ChartEntry<any>[]) {
		const series = new LineSeries();

		series.id = id;
		series.tensionX = 0.7; // smoothing
		series.stroke = amColor(color);
		series.fill = amColor(color);
		series.strokeWidth = 1.5;
		series.fillOpacity = 0.3;
		series.data = data;

		return series;
	}

	public static barSeries(id: string, color: string, data: ChartEntry<number>[]) {
		const series = new ColumnSeries();

		series.id = id;
		series.columns.template.stroke = amColor(color);
		series.columns.template.fill = amColor(color);
		series.columns.template.strokeWidth = 1.5;
		series.columns.template.fillOpacity = 0.3;
		series.columns.template.tooltipText = `[bold]{categoryX}[/]: {valueY}`;
		series.dataFields = { categoryX: 'label', valueY: 'value' };
		series.data = data;

		return series;
	}

	public static pieSeries(colors: string[]) {
		const set = new ColorSet();
		set.list = colors.map(c => amColor(c));

		const series = new PieSeries();
		series.dataFields = { category: 'label', value: 'value', hiddenInLegend: 'disabled' };
		series.labels.template.disabled = true;
		series.ticks.template.disabled = true;
		series.colors = set;

		series.slices.template.propertyFields.fill = 'color';
		series.slices.template.propertyFields.fillOpacity = 'opacity';
		series.slices.template.propertyFields.stroke = 'color';
		series.slices.template.propertyFields.strokeDasharray = 'strokeDasharray';
		series.slices.template.propertyFields.tooltipText = 'tooltip';

		return series;
	}

	public static guideLine(value: number, mode: 'value' | 'category' = 'value') {
		const type = mode;
		return {
			[type]: value,
			grid: {
				stroke: 'red',
				strokeOpacity: 0.5,
				strokeDasharray: '5, 2, 2',
				strokeWidth: 2
			}
		};
	}

	public static rangeFill(start: number, end: number, color: string, series: string | number) {
		return {
			series: series.toString(),
			value: start,
			endValue: end,
			contents: {
				stroke: color,
				fill: color,
				fillOpacity: 0.3
			}
		};
	}

	public static xyChartOptions(xAxis: string) {
		return {
			series: [] as object[],
			yAxes: [{
				type: 'ValueAxis',
				fontSize: 12
			}],
			xAxes: [{
				type: xAxis,
				fontSize: 12
			}],
			dateFormatter: { dateFormat: 'MMM dd, YYYY hh:mm a' },
			cursor: {},
			legend: {
				fontSize: 12,
				position: 'top',
				markers: {
					height: 12,
					width: 12
				}
			}
		};
	}

	public static pieChartOptions() {
		return {
			series: [] as PieSeries[],
			innerRadius: '40%',
			legend: {
				fontSize: 12,
				position: 'top',
				markers: {
					height: 12,
					width: 12
				}
			}
		};
	}

	public static refreshSeries(chart: SerialChart, series: Series[]) {
		const currentSeries = chart['series'] as ListTemplate<Series>;
		currentSeries.setAll(series);
	}

	public static refreshScrollbarX(chart: SerialChart, scrollbar: Scrollbar) {
		if (chart.series.length) {
			if (scrollbar['series']) {
				chart.series.each(s => scrollbar['series'].push(s));
			}
			chart['scrollbarX'] = scrollbar;
		}
	}
}
