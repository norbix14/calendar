import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../ui/Navbar'
import BigCalendar from './BigCalendar'
import CalendarModal from './CalendarModal'
import AddButtonFab from '../ui/AddButtonFab'
import DeleteButtonFab from '../ui/DeleteButtonFab'

export default function CalendarScreen() {
	const { active } = useSelector((state) => state.calendar)

	return (
		<div className="big-calendar-screen">
			<Navbar />
			<AddButtonFab />
			{
				active &&	<DeleteButtonFab />
			}
			<BigCalendar />
			<CalendarModal />
		</div>
	)
}