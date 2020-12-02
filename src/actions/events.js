import { types } from '../types/'
import { fetchWithToken } from '../helpers/fetch'
import { eventsFormat } from '../helpers/events-format'
import { Toast } from '../utils/SweetAlert'

const eventAdd = (event) => {
	return {
		type: types.eventAdd,
		payload: event
	}
}

const eventLoad = (events) => {
	return {
		type: types.eventLoad,
		payload: events
	}
}

const eventUpdate = (event) => {
	return {
		type: types.eventUpdate,
		payload: event
	}
}

const eventDelete = () => {
	return {
		type: types.eventDelete
	}
}

export const eventActive = (event) => {
	return {
		type: types.eventActive,
		payload: event
	}
}

export const eventClearActive = () => {
	return {
		type: types.eventClearActive
	}
}

export const eventLogoutCleaning = () => {
	return {
		type: types.eventLogoutCleaning
	}
}

export const startEventLoading = () => {
	return async (dispatch) => {
		try {
			const res = await fetchWithToken('events')
			const body = await res.json()
			if(body.ok) {
				const events = eventsFormat(body.events)
				dispatch(eventLoad(events))
			} else {
				Toast('warning', body.msg)
			}
		} catch(e) {
			console.log('No se han podido obtener los eventos')
		}
	}
}

export const startEventAdd = (event) => {
	return async (dispatch, getState) => {
		try {
			const { user: { uid, name } } = getState().auth
			const res = await fetchWithToken('events', event, 'POST')
			const body = await res.json()
			if(body.ok) {
				event._id = body.event._id
				event.user = {
					_id: uid,
					name
				}
				dispatch(eventAdd(event))
			} else {
				Toast('warning', body.msg)
			}
		} catch(e) {
			console.log('No se ha podido guardar el evento')
		}
	}
}

export const startEventUpdate = (event) => {
	return async (dispatch) => {
		try {
			const url = `events/${event._id}`
			const res = await fetchWithToken(url, event, 'PUT')
			const body = await res.json()
			if(body.ok) {
				dispatch(eventUpdate(event))
			} else {
				Toast('warning', body.msg)
			}
		} catch(e) {
			console.log('No se ha podido actualizar el evento')
		}
	}
}

export const startEventDelete = () => {
	return async (dispatch, getState) => {
		try {
			const { active } = getState().calendar
			const url = `events/${active._id}`
			const res = await fetchWithToken(url, {}, 'DELETE')
			const body = await res.json()
			if(body.ok) {
				dispatch(eventDelete())
			} else {
				Toast('warning', body.msg)
			}
		} catch(e) {
			console.log('No se ha podido eliminar el evento')
		}
	}
}
