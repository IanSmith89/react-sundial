import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import CalendarControls from '../CalendarControls'
import CalendarMonthView from '../CalendarMonthView'

const useStyles = makeStyles(
	() => ({
		container: {
			width: '100%',
		},
	}),
	{ name: 'RSCalendar' }
)

const Calendar = ({ relativeDate: initialDate = moment().toISOString() }) => {
	const classes = useStyles()
	const [relativeDate, setRelativeDate] = useState(initialDate)
	const [view, setView] = useState('month')

	const handleNextClick = useCallback(
		() =>
			setRelativeDate(prevDate =>
				moment(prevDate)
					.add(1, `${view}s`)
					.toISOString()
			),
		[view]
	)

	const handlePreviousClick = useCallback(
		() =>
			setRelativeDate(prevDate =>
				moment(prevDate)
					.subtract(1, `${view}s`)
					.toISOString()
			),
		[view]
	)

	const handleTodayClick = () => setRelativeDate(moment().toISOString())

	const handleViewChange = e => setView(e.currentTarget.id)

	return (
		<div className={classes.container}>
			<CalendarControls
				onNextClick={handleNextClick}
				onPreviousClick={handlePreviousClick}
				onTodayClick={handleTodayClick}
				onViewChange={handleViewChange}
				relativeDate={relativeDate}
				view={view}
			/>
			{view === 'week' && <div>Week View</div>}
			{view === 'month' && <CalendarMonthView relativeDate={relativeDate} />}
			{view === 'year' && <div>Year View</div>}
		</div>
	)
}

Calendar.propTypes = {
	relativeDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
}

export default Calendar
