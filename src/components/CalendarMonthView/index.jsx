import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import moment from 'moment'
import clsx from 'clsx'
// import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { getMonthDays, isNotCurrentMonth } from '../../utils/dateUtils'

const useStyles = makeStyles(
	theme => ({
		container: {
			height: '100%',
			width: '100%',
		},
		dayLabelsContainer: {
			display: 'flex',
			width: '100%',
		},
		dayOfWeekLabel: {
			borderTop: `0.1rem solid ${theme.palette.divider}`,
			borderRight: `0.1rem solid ${theme.palette.divider}`,
			color: theme.palette.grey['600'],
			padding: theme.spacing(0.75, 0, 0),
			textAlign: 'center',
			textTransform: 'uppercase',
			width: 'calc(100% / 7)',
			'&:first-of-type': {
				borderLeft: `0.1rem solid ${theme.palette.divider}`,
			},
		},
		daysContainer: {
			display: 'flex',
			flexWrap: 'wrap',
			width: '100%',
		},
		day: {
			alignItems: 'center',
			borderBottom: `0.1rem solid ${theme.palette.divider}`,
			borderRight: `0.1rem solid ${theme.palette.divider}`,
			display: 'flex',
			flexDirection: 'column',
			minHeight: '13.6rem',
			width: 'calc(100% / 7)',
		},
		hasLeftBorder: {
			borderLeft: `0.1rem solid ${theme.palette.divider}`,
		},
		dateLabel: {
			alignItems: 'center',
			borderRadius: '50%',
			color: theme.palette.text.primary,
			display: 'flex',
			height: '2.4rem',
			justifyContent: 'center',
			marginTop: theme.spacing(0.25),
			minWidth: '2.4rem',
			position: 'relative',
			'&:hover': {
				backgroundColor: theme.palette.action.hover,
				cursor: 'pointer',
				top: -1,
			},
		},
		dayOutsideCurrentMonth: {
			color: theme.palette.grey['500'],
		},
		dayIsToday: {
			backgroundColor: theme.palette.secondary.main,
			color: theme.palette.common.white,
			'&:hover': {
				backgroundColor: theme.palette.secondary.dark,
				top: 0,
			},
		},
	}),
	{ name: 'RSCalendarMonthView' }
)

const CalendarMonthView = ({ relativeDate = moment().toISOString() }) => {
	const classes = useStyles()
	const days = getMonthDays(relativeDate)
	const today = moment()

	return (
		<div className={classes.container}>
			<div className={classes.dayLabelsContainer}>
				{['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(day => (
					<Typography key={day} className={classes.dayOfWeekLabel} component="span" variant="caption">
						{day}
					</Typography>
				))}
			</div>
			<div className={classes.daysContainer}>
				{days.map((day, i) => {
					const date = day.date()
					const isToday = today.isSame(day, 'day')

					return (
						<div
							key={day}
							className={clsx(classes.day, {
								[classes.hasLeftBorder]: i % 7 === 0,
							})}
						>
							<Typography
								className={clsx(classes.dateLabel, {
									[classes.dayOutsideCurrentMonth]: isNotCurrentMonth(relativeDate, day),
									[classes.dayIsToday]: isToday,
								})}
								component="p"
								variant="caption"
							>
								{`${!isToday && date === 1 ? day.format('MMM') + ' ' + date : date}`}
							</Typography>
						</div>
					)
				})}
			</div>
		</div>
	)
}

CalendarMonthView.propTypes = {
	relativeDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
}

export default CalendarMonthView
