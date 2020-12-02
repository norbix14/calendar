import moment from 'moment'

export const myEventsList = [
	{
		id: 1,
		title: 'event title one',
		allDay: false,
		start: moment().toDate(),
		end: moment().add(2, 'hours').toDate(),
		bgColor: '#fafafa',
		notes: 'notes',
		user: {
			_id: 'Nof87D9',
			name: 'alejandro',
		}
	},
	{
		id: 2,
		title: 'event title two',
		allDay: false,
		start: moment().toDate(),
		end: moment().add(2, 'hours').toDate(),
		bgColor: '#fafafa',
		notes: 'notes',
		user: {
			_id: 'Nof8ND9',
			name: 'norberto',
		}
	}
]