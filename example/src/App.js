import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import { ExampleComponent } from 'react-sundial'
import PageContainer from './layout/PageContainer'
import theme from './theme'
import { NavigationProvider } from './contexts/NavigationContext'

const homePath = '/react-sundial'

const App = () => (
	<ThemeProvider theme={theme}>
		<NavigationProvider>
			<Suspense fallback={<CircularProgress />}>
				<PageContainer>
					<Switch>
						<Route exact path={homePath}>
							<div>Home Page</div>
						</Route>
						<Route path={`${homePath}/components`}>
							<ExampleComponent text="Create React Library Example 😄" />
						</Route>
					</Switch>
				</PageContainer>
			</Suspense>
		</NavigationProvider>
	</ThemeProvider>
)

export default App
