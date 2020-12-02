import { types } from '../types/'
import {
	fetchWithToken,
	fetchWithoutToken
} from '../helpers/fetch'
import { Toast } from '../utils/SweetAlert'

const checkingEnd = () => {
	return {
		type: types.checkingEnd
	}
}

const login = (user) => {
	return {
		type: types.login,
		payload: user
	}
}

const logout = () => {
	return {
		type: types.logout
	}
}

export const startLogout = () => {
	return (dispatch) => {
		localStorage.clear()
		dispatch(logout())
	}
}

export const startChecking = () => {
	return async (dispatch) => {
		try {
			const res = await fetchWithToken('auth/renew')
			const body = await res.json()
			if(body.ok) {
				localStorage.setItem('token', body.token)
				localStorage.setItem('token-init-date', new Date().getTime())
				dispatch(login(body.user))
			} else {
				dispatch(checkingEnd())
			}
		} catch(e) {
			console.log('Ha ocurrido un error al hacer checking')
		}
	}
}

export const startRegister = (name, email, password) => {
	return async (dispatch) => {
		try {
			const data = { name, email, password }
			const res = await fetchWithoutToken('auth/new', data, 'POST')
			const body = await res.json()
			if(body.ok) {
				localStorage.setItem('token', body.token)
				localStorage.setItem('token-init-date', new Date().getTime())
				dispatch(login(body.user))
			} else {
				Toast('warning', body.msg)
			}
		} catch(e) {
			console.log('Ha ocurrido un error al registrar')
		}
	}
}

export const startLogin = (email, password) => {
	return async (dispatch) => {
		try {
			const data = { email, password }
			const res = await fetchWithoutToken('auth', data, 'POST')
			const body = await res.json()
			if(body.ok) {
				localStorage.setItem('token', body.token)
				localStorage.setItem('token-init-date', new Date().getTime())
				dispatch(login(body.user))
			} else {
				Toast('warning', body.msg)
			}
		} catch(e) {
			console.log('Ha ocurrido un error al hacer login')
		}
	}
}
