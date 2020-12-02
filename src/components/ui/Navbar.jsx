import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth'
import { eventLogoutCleaning } from '../../actions/events'

export default function Navbar() {
	const dispatch = useDispatch()
	const { user } = useSelector((state) => state.auth)

	const handleLogout = () => {
		dispatch(eventLogoutCleaning())
		dispatch(startLogout())
	}

	return (
		<div className="navbar navbar-dark bg-dark mb-4">
			<span 
				className="navbar-brand"
				title="Usuario actual"
			>{user.name}</span>
			<button 
				className="btn btn-outline-danger"
				title="Cerrar sesión"
				onClick={handleLogout}
			>
				<i className="fas fa-sign-out-alt"></i>
				<span> Logout</span>
			</button>
		</div>
	)
}