import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { NavigationContext } from '../../contexts/NavigationContext'
import AppBar from '../AppBar'
import AppMenu from '../AppMenu'

const menuWidth = '24rem'

const useStyles = makeStyles(theme => {
	const enterTransition = `${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.easeOut}`
	const exitTransition = `${theme.transitions.duration.leavingScreen}ms ${theme.transitions.easing.easeIn}`

	return {
		pageContainer: {
			position: 'relative',
			width: '100%',
		},
		sideMenuContainer: {
			borderRight: `0.1rem solid ${theme.palette.divider}`,
			height: 'calc(100vh - 6.4rem)',
			left: 0,
			overflow: 'hidden',
			position: 'fixed',
			top: '6.4rem',
			transform: `translate3d(-${menuWidth}, 0, 0)`,
			transition: `transform ${exitTransition}`,
			width: `${menuWidth}`,
		},
		sideMenuVisible: {
			transform: 'translate3d(0, 0, 0)',
			transition: `transform ${enterTransition},`,
		},
		mainContent: {
			left: 0,
			margin: '0 auto',
			maxWidth: '122.8rem',
			padding: theme.spacing(4, 8, 8),
			position: 'absolute',
			right: 0,
			top: 0,
			transition: `all ${exitTransition}`,
			width: '100%',
		},
		mainContentCondensed: {
			transition: `all ${enterTransition}`,
			left: menuWidth,
			width: `calc(100% - ${menuWidth})`,
		},
	}
})

const PageContainer = ({ children }) => {
	const classes = useStyles()
	const { isAppMenuVisible } = useContext(NavigationContext)

	return (
		<>
			<AppBar />
			<div className={classes.pageContainer}>
				<div
					className={clsx(classes.sideMenuContainer, {
						[classes.sideMenuVisible]: isAppMenuVisible,
					})}
				>
					<AppMenu />
				</div>
				<main
					className={clsx(classes.mainContent, {
						[classes.mainContentCondensed]: isAppMenuVisible,
					})}
				>
					{children}
				</main>
			</div>
		</>
	)
}

export default PageContainer
