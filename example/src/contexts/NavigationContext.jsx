import React, { createContext, useState } from 'react'

export const NavigationContext = createContext()

export const NavigationProvider = ({ children }) => {
	const [isAppMenuVisible, setIsAppMenuVisible] = useState(false)

	const toggleIsAppMenuVisible = () => setIsAppMenuVisible(prevIsVisible => !prevIsVisible)

	return (
		<NavigationContext.Provider value={{ isAppMenuVisible, toggleIsAppMenuVisible }}>
			{children}
		</NavigationContext.Provider>
	)
}
