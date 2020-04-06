export const homePath = '/react-sundial'
export const gettingStartedPath = `${homePath}/getting-started`
export const versionsPath = `${homePath}/versions`

export const componentsPath = `${homePath}/components`
export const calendarPath = `${componentsPath}/calendar`
export const datePickerPath = `${componentsPath}/date-picker`
export const dateRangePickerPath = `${componentsPath}/date-range-picker`

export const appMenuItems = {
	// [homePath]: {
	// 	title: 'Home',
	// },
	[gettingStartedPath]: {
		title: 'Getting Started',
	},
	[componentsPath]: {
		title: 'Components',
		items: {
			[calendarPath]: {
				title: 'Calendar',
			},
			[datePickerPath]: {
				title: 'Date Picker',
			},
			[dateRangePickerPath]: {
				title: 'Date Range Picker',
			},
		},
	},
	[versionsPath]: {
		title: 'Versions',
	},
}
