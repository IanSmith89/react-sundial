import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { Calendar } from 'react-sundial'
import { Prism as SyntaxHighliter } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'

const useStyles = makeStyles(theme => ({
	pageTitle: {
		marginBottom: theme.spacing(3),
	},
	exampleContainer: {
		border: `0.1rem solid ${theme.palette.divider}`,
		borderRadius: theme.shape.borderRadius,
		padding: theme.spacing(4),
		marginBottom: theme.spacing(4),
	},
	snippetContainer: {
		fontSize: '1.4rem',
		margin: '0 auto',
		maxWidth: '80rem',
	},
	snippet: {
		borderRadius: theme.shape.borderRadius,
	},
}))

const codeSnippet = `import React from 'react'
import { Calendar } from 'react-sundial'

const ExampleCalendar = () => {
    return <Calendar />
}

export default ExampleCalendar
`

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
			<div className={classes.snippetContainer}>
				<SyntaxHighliter className={classes.snippet} language="javascript" style={darcula}>
					{codeSnippet}
				</SyntaxHighliter>
			</div>
		</div>
	)
}

export default CalendarPage
