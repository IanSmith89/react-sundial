import React, { Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import PageContainer from './layout/PageContainer'
import theme from './utils/theme'
import { NavigationProvider } from './contexts/NavigationContext'
import {
	homePath,
	gettingStartedPath,
	versionsPath,
	calendarPath,
	datePickerPath,
	dateRangePickerPath,
} from './utils/constants'

const HomePage = lazy(() => import('./pages/HomePage'))
const GettingStartedPage = lazy(() => import('./pages/GettingStartedPage'))
const CalendarPage = lazy(() => import('./pages/CalendarPage'))
const DatePickerPage = lazy(() => import('./pages/DatePickerPage'))
const DateRangePickerPage = lazy(() => import('./pages/DateRangePickerPage'))
const VersionsPage = lazy(() => import('./pages/VersionsPage'))

const App = () => (
	<ThemeProvider theme={theme}>
		<NavigationProvider>
			<PageContainer>
				<Suspense fallback={<CircularProgress />}>
					<Switch>
						<Route exact path={homePath}>
							<HomePage />
						</Route>
						<Route path={gettingStartedPath}>
							<GettingStartedPage />
						</Route>
						<Route path={calendarPath}>
							<CalendarPage />
						</Route>
						<Route path={datePickerPath}>
							<DatePickerPage />
						</Route>
						<Route path={dateRangePickerPath}>
							<DateRangePickerPage />
						</Route>
						<Route path={versionsPath}>
							<VersionsPage />
						</Route>
					</Switch>
				</Suspense>
			</PageContainer>
		</NavigationProvider>
	</ThemeProvider>
)

export default App
