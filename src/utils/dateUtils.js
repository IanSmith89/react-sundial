import moment from 'moment'

const getDayRange = relativeDate => {
	const startDay = moment(relativeDate)
		.startOf('month')
		.startOf('week')
	const endDay = moment(relativeDate)
		.endOf('month')
		.endOf('week')

	return endDay.diff(startDay, 'days')
}

export const getMonthDays = relativeDate => {
	const range = getDayRange(relativeDate)
	const days = []

	for (let i = 0; i <= range; i++) {
		const day = moment(relativeDate)
			.startOf('month')
			.startOf('week')
			.add(i, 'days')
		days.push(day)
	}

	return days
}

export const isNotCurrentMonth = (relativeDate, day) => moment(relativeDate).month() !== day.month()
