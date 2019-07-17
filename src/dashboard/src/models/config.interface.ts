export interface DashboardConfig {
	theme: 'default' | 'chiller' | 'legacy' | 'cool' | 'ice' | 'light';
	startCompressed: boolean;
	showHeader: boolean;
	showSearch: boolean;
	activeMenuColor?: string;
}
