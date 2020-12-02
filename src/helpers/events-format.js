import moment from 'moment'

export const eventsFormat = (events = []) => {
	return events.map(event => {
		return {
			...event,
			start: moment(event.start).toDate(),
			end: moment(event.end).toDate(),
		}
	})
}