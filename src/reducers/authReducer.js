import { types } from '../types/'

const initialState = {
	checking: true,
	user: {
		uid: null,
		name: null
	},
}

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case types.checkingEnd:
			return {
				...state,
				checking: false
			}

		case types.login:
			return {
				...state,
				checking: false,
				user: action.payload
			}

		case types.logout:
			return {
				checking: false,
				user: {
					uid: null,
					name: null
				}
			}

		default:
			return state
	}
}