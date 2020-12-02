import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function PrivateRoute({isAuthenticated, component: Component, ...rest}) {
	return (
		<Route 
			{...rest}
			component={(props) => (
				isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
			)}
		/>
	)
}

PrivateRoute.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	component: PropTypes.func.isRequired
}