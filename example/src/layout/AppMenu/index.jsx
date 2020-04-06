import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core'
import { appMenuItems } from '../../utils/constants'
import { Link, useLocation } from 'react-router-dom'
import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
	listContainer: {
		width: '100%',
	},
	listItem: {
		color: theme.palette.text.primary,
		textDecoration: 'none',
		transition: `color ${theme.transitions.duration.short}ms ${theme.transitions.easing.sharp}`,
	},
	nestedItem: {
		paddingLeft: theme.spacing(4),
	},
	active: {
		color: theme.palette.secondary.main,
	},
}))

const ListItemCollapse = ({ isNested, items, title }) => {
	const classes = useStyles()
	const [isOpen, setIsOpen] = useState(false)

	const toggleIsOpen = () => setIsOpen(prevIsOpen => !prevIsOpen)

	return (
		<>
			<ListItem
				button
				className={clsx(classes.listItem, {
					[classes.nestedItem]: isNested,
				})}
				onClick={toggleIsOpen}
			>
				<ListItemText primary={title} />
				{isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
			</ListItem>
			<Collapse in={isOpen} timeout="auto" unmountOnExit>
				<ListItems isNested items={items} />
			</Collapse>
		</>
	)
}

const ListItemLink = ({ isNested, title, to }) => {
	const classes = useStyles()
	const { pathname } = useLocation()

	const isActive = to === pathname

	return (
		<Link
			className={clsx(classes.listItem, {
				[classes.active]: isActive,
			})}
			to={to}
		>
			<ListItem
				button
				className={clsx({
					[classes.nestedItem]: isNested,
				})}
			>
				<ListItemText primary={title} />
			</ListItem>
		</Link>
	)
}

const ListItems = ({ isNested, items: obj }) =>
	Object.keys(obj).map(key => {
		const { items, title } = obj[key]

		return items ? (
			<ListItemCollapse key={key} isNested={isNested} items={items} title={title} />
		) : (
			<ListItemLink key={key} isNested={isNested} to={key} title={title} />
		)
	})

const AppMenu = ({ children }) => {
	const classes = useStyles()

	return (
		<List className={classes.listContainer}>
			<ListItems items={appMenuItems} />
		</List>
	)
}

export default AppMenu
