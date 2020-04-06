import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Button, IconButton, Typography, Menu, MenuItem } from '@material-ui/core'
import {
	KeyboardArrowLeft as KeyboardArrowLeftIcon,
	KeyboardArrowRight as KeyboardArrowRightIcon,
	ArrowDropDown as ArrowDropDownIcon,
} from '@material-ui/icons'
import moment from 'moment'
import clsx from 'clsx'

const useStyles = makeStyles(
	theme => ({
		container: {
			alignItems: 'center',
			display: 'flex',
			marginBottom: theme.spacing(2),
			padding: theme.spacing(0, 2),
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
		viewButton: {
			marginLeft: 'auto',
		},
		viewItem: {
			textTransform: 'capitalize',
		},
	}),
	{ name: 'RSCalendarControls' }
)

const CalendarControls = ({
	onNextClick,
	onPreviousClick,
	onTodayClick,
	onViewChange,
	relativeDate = moment().toISOString(),
	view = 'month',
	viewOptions = ['week', 'month', 'year'],
}) => {
	const classes = useStyles()
	const [menuAnchorEl, setMenuAnchorEl] = useState(null)

	const formattedDate = useMemo(() => {
		let config = 'MMMM YYYY'

		if (view === 'year') config = 'YYYY'
		// else if (view === 'week') config =

		return moment(relativeDate).format(config)
	}, [relativeDate, view])

	const handleClose = () => setMenuAnchorEl(null)

	const handleViewMenuClick = e => setMenuAnchorEl(e.currentTarget)

	const handleViewChange = e => {
		onViewChange(e)
		handleClose()
	}

	return (
		<div className={classes.container}>
			<Button className={clsx(classes.button, classes.todayButton)} onClick={onTodayClick} variant="outlined">
				Today
			</Button>
			<div className={classes.buttonsContainer}>
				<IconButton onClick={onPreviousClick} size="small">
					<KeyboardArrowLeftIcon />
				</IconButton>
				<IconButton onClick={onNextClick} size="small">
					<KeyboardArrowRightIcon />
				</IconButton>
			</div>
			<Typography component="p" variant="h6">
				{formattedDate}
			</Typography>
			<Button
				className={clsx(classes.button, classes.viewButton)}
				endIcon={<ArrowDropDownIcon />}
				onClick={handleViewMenuClick}
				variant="outlined"
			>
				{view}
			</Button>
			<Menu
				id="view-calendar-mode"
				anchorEl={menuAnchorEl}
				keepMounted
				open={Boolean(menuAnchorEl)}
				onClose={handleClose}
			>
				{viewOptions.map(option => (
					<MenuItem key={option} className={classes.viewItem} id={option} onClick={handleViewChange}>
						{option}
					</MenuItem>
				))}
			</Menu>
		</div>
	)
}

CalendarControls.propTypes = {
	onNextClick: PropTypes.func,
	onPreviousClick: PropTypes.func,
	onTodayClick: PropTypes.func,
	onViewChange: PropTypes.func,
	relativeDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
	view: PropTypes.oneOf(['week', 'month', 'year']),
	viewOptions: PropTypes.arrayOf(PropTypes.string),
}

export default CalendarControls
