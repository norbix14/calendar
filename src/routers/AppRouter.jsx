import React, { useEffect } from 'react'
import {
	BrowserRouter as Router,
	Redirect,
	Switch
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { startChecking } from '../actions/auth'
import LoginScreen from '../components/auth/LoginScreen'
import CalendarScreen from '../components/calendar/CalendarScreen'
import Loader from '../components/utils/Loader'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export default function AppRouter() {
	const dispatch = useDispatch()
	const { checking, user } = useSelector((state) => state.auth)

	useEffect(() => {
		dispatch(startChecking())
	}, [dispatch])

	if(checking) {
		return <Loader />
	}

	return (
		<Router>
			<div className="container">
				<Switch>
					<PublicRoute 
						exact 
						path="/login" 
						isAuthenticated={!!user.uid} 
						component={LoginScreen} 
					/>
					<PrivateRoute 
						exact 
						path="/" 
						isAuthenticated={!!user.uid} 
						component={CalendarScreen} 
					/>
					<Redirect to="/" />
				</Switch>
			</div>
		</Router>
	)
}