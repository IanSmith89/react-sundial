import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { Calendar } from 'react-sundial'

const useStyles = makeStyles(theme => ({
	pageTitle: {
		marginBottom: theme.spacing(3),
	},
	exampleContainer: {
		border: `0.1rem solid ${theme.palette.divider}`,
		borderRadius: theme.shape.borderRadius,
		padding: theme.spacing(4),
	},
}))

const CalendarPage = () => {
	const classes = useStyles()

	return (
		<div>
			<Typography className={classes.pageTitle} component="h1" variant="h4">
				Calendar
			</Typography>
			<div className={classes.exampleContainer}>
				<Calendar />
			</div>
		</div>
	)
}

export default CalendarPage
