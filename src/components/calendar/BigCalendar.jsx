import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import 'moment/locale/es'
import CalendarEvent from './CalendarEvent'
import { uiOpenModal } from '../../actions/ui'
import {
	eventActive,
	eventClearActive,
	startEventLoading
} from '../../actions/events'
import { messages } from '../../helpers/calendar-messages-es'

moment.locale('es')
const localizer = momentLocalizer(moment)

const lastView = localStorage.getItem('lastVisitedView') || 'month'

export default function BigCalendar(props) {
	const [	lastVisitedView, setLastVisitedView ] = useState(lastView)

	const dispatch = useDispatch()
	const { events, active } = useSelector((state) => state.calendar)
	const { user } = useSelector((state) => state.auth)

	const eventStyleGetter = (event, start, end, isSelected) => {
		const style = {
			backgroundColor: (user.uid === event.user._id) ? '#367cf7' : '#465660',
			borderRadius: '0px',
			opacity: (user.uid === event.user._id) ? 0.9 : 0.7,
			display: 'block',
			color: '#fff',
		}
		return { style }
	}

	const onDoubleClick = (e) => {
		dispatch(uiOpenModal())
	}

	const onSelect = (e) => {
		dispatch(eventActive(e))
	}

	const onSelectSlot = (e) => {
		if(active) {
			dispatch(eventClearActive())
		}
	}

	const onViewChange = (e) => {
		localStorage.setItem('lastVisitedView', e)
		setLastVisitedView(e)
	}

	useEffect(() => {
		dispatch(startEventLoading())
	}, [dispatch])

	return (
		<div>
	    <Calendar
	      startAccessor="start"
	      endAccessor="end"
	      localizer={localizer}
	      events={events}
	      messages={messages}
	      eventPropGetter={eventStyleGetter}
	      onDoubleClickEvent={onDoubleClick}
	      onSelectEvent={onSelect}
	      onSelectSlot={onSelectSlot}
	      selectable={true}
	      onView={onViewChange}
	      view={lastVisitedView}
	      components={
	      	{
	      		event: CalendarEvent
	      	}
	      }
	    />
	  </div>
	)
}