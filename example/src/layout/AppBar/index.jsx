import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar as MaterialAppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
import { NavigationContext } from '../../contexts/NavigationContext'
import { Link } from 'react-router-dom'
import { homePath } from '../../utils/constants'

const useStyles = makeStyles(theme => ({
	offset: {
		height: '6.4rem',
	},
}))

const AppBar = () => {
	const classes = useStyles()
	const { toggleIsAppMenuVisible } = useContext(NavigationContext)

	return (
		<>
			<MaterialAppBar position="fixed">
				<Toolbar>
					<IconButton aria-label="menu" color="inherit" edge="start" onClick={toggleIsAppMenuVisible}>
						<MenuIcon />
					</IconButton>
					<Link to={homePath}>
						<Typography>react-sundial</Typography>
					</Link>
				</Toolbar>
			</MaterialAppBar>
			<div className={classes.offset} />
		</>
	)
}

export default AppBar
