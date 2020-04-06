import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, IconButton, Typography, Menu, MenuItem } from '@material-ui/core'
import {
	KeyboardArrowLeft as KeyboardArrowLeftIcon,
	KeyboardArrowRight as KeyboardArrowRightIcon,
	ArrowDropDown as ArrowDropDownIcon,
} from '@material-ui/icons'
import moment from 'moment'
import clsx from 'clsx'
import { getMonthDays, isNotCurrentMonth } from '../../utils/dateUtils'

const useStyles = makeStyles(
	theme => ({
		container: {
			width: '100%',
		},
		controlsContainer: {
			alignItems: 'center',
			display: 'flex',
			marginBottom: theme.spacing(2),
			width: '100%',
		},
		button: {
			color: theme.palette.grey['600'],
		},
		todayButton: {
			marginRight: theme.spacing(2),
		},
		buttonsContainer: {
			marginRight: theme.spacing(2),
		},
		viewModeButton: {
			marginLeft: 'auto',
		},
		calendarContainer: {},
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
			height: '13.6rem',
			width: 'calc(100% / 7)',
		},
		hasLeftBorder: {
			borderLeft: `0.1rem solid ${theme.palette.divider}`,
		},
		dateLabel: {
			color: theme.palette.text.primary,
			marginTop: theme.spacing(0.25),
		},
		dayOutsideCurrentMonth: {
			color: theme.palette.grey['500'],
		},
		dayIsToday: {
			alignItems: 'center',
			backgroundColor: theme.palette.secondary.main,
			borderRadius: '50%',
			color: theme.palette.common.white,
			display: 'flex',
			height: '2.4rem',
			justifyContent: 'center',
			width: '2.4rem',
		},
	}),
	{ name: 'RSCalendar' }
)

const Calendar = ({ initialDate = moment().toISOString() }) => {
	const classes = useStyles()
	const [relativeDate, setRelativeDate] = useState(initialDate)
	const [menuAnchorEl, setMenuAnchorEl] = useState(null)
	const days = getMonthDays(relativeDate)
	const today = moment()

	const handleNextClick = () =>
		setRelativeDate(prevDate =>
			moment(prevDate)
				.add(1, 'months')
				.toISOString()
		)

	const handlePreviousClick = () =>
		setRelativeDate(prevDate =>
			moment(prevDate)
				.subtract(1, 'months')
				.toISOString()
		)

	const handleTodayClick = () => setRelativeDate(today.toISOString())

	const handleViewModeClick = e => {
		setMenuAnchorEl(e.currentTarget)
	}

	const handleViewModeClose = () => {
		setMenuAnchorEl(null)
	}

	return (
		<div className={classes.container}>
			<div className={classes.controlsContainer}>
				<Button
					className={clsx(classes.button, classes.todayButton)}
					onClick={handleTodayClick}
					variant="outlined"
				>
					Today
				</Button>
				<div className={classes.buttonsContainer}>
					<IconButton onClick={handlePreviousClick} size="small">
						<KeyboardArrowLeftIcon />
					</IconButton>
					<IconButton onClick={handleNextClick} size="small">
						<KeyboardArrowRightIcon />
					</IconButton>
				</div>
				<Typography component="p" variant="h6">
					{moment(relativeDate).format('MMMM YYYY')}
				</Typography>
				<Button
					className={clsx(classes.button, classes.viewModeButton)}
					endIcon={<ArrowDropDownIcon />}
					onClick={handleViewModeClick}
					variant="outlined"
				>
					Month
				</Button>
				<Menu
					id="view-calendar-mode"
					anchorEl={menuAnchorEl}
					keepMounted
					open={Boolean(menuAnchorEl)}
					onClose={handleViewModeClose}
				>
					<MenuItem>Week</MenuItem>
					<MenuItem>Month</MenuItem>
					<MenuItem>Year</MenuItem>
				</Menu>
			</div>
			<div className={classes.calendarContainer}>
				<div className={classes.dayLabelsContainer}>
					{['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(day => (
						<Typography key={day} className={classes.dayOfWeekLabel} component="span" variant="caption">
							{day}
						</Typography>
					))}
				</div>
			</div>
			<div className={classes.daysContainer}>
				{days.map((day, i) => {
					const date = day.date()

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
									[classes.dayIsToday]: today.isSame(day, 'day'),
								})}
								component="p"
								variant="caption"
							>
								{`${date === 1 ? day.format('MMM') + ' ' + date : date}`}
							</Typography>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Calendar
