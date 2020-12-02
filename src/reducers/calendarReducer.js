import { types } from '../types/'

const initialState = {
	events: [],
	active: null
}

export default function calendarReducer(state = initialState, action) {
	switch (action.type) {
		case types.eventAdd:
			return {
				...state,
				events: [
					...state.events,
					action.payload
				]
			}

		case types.eventActive:
			return {
				...state,
				active: action.payload
			}

		case types.eventClearActive:
			return {
				...state,
				active: null
			}

		case types.eventUpdate:
			return {
				...state,
				events: state.events.map(
					event => event._id === action.payload._id ? action.payload : event
				)
			}

		case types.eventDelete:
			return {
				...state,
				events: state.events.filter(
					event => event._id !== state.active._id
				),
				active: null
			}

		case types.eventLoad:
			return {
				...state,
				events: [
					...action.payload
				]
			}

		case types.eventLogoutCleaning:
			return {
				...initialState
			}

		default:
			return state
	}
}