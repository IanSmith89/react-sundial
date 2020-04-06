import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, IconButton, Typography, Menu, MenuItem } from '@material-ui/core'
import {
	KeyboardArrowLeft as KeyboardArrowLeftIcon,
	KeyboardArrowRight as KeyboardArrowRightIcon,
	ArrowDropDown as ArrowDropDownIcon,
} from '@material-ui/icons'

const useStyles = makeStyles(
	theme => ({
		container: {
			width: '100%',
		},
		controlsContainer: {
			alignItems: 'center',
			display: 'flex',
			width: '100%',
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
	}),
	{ name: 'RSCalendar' }
)

const Calendar = () => {
	const classes = useStyles()
	const [anchorEl, setAnchorEl] = useState(null)

	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<div className={classes.container}>
			<div className={classes.controlsContainer}>
				<Button className={classes.todayButton} variant="outlined">
					Today
				</Button>
				<div className={classes.buttonsContainer}>
					<IconButton size="small">
						<KeyboardArrowLeftIcon />
					</IconButton>
					<IconButton size="small">
						<KeyboardArrowRightIcon />
					</IconButton>
				</div>
				<Typography component="p" variant="h6">
					Date
				</Typography>
				<Button
					className={classes.viewModeButton}
					endIcon={<ArrowDropDownIcon />}
					onClick={handleClick}
					variant="outlined"
				>
					Month
				</Button>
				<Menu
					id="view-calendar-mode"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem>Week</MenuItem>
					<MenuItem>Month</MenuItem>
					<MenuItem>Year</MenuItem>
				</Menu>
			</div>
		</div>
	)
}

export default Calendar
