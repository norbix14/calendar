import React from 'react'

export default function CalendarEvent(props) {
	const { title, user: { name } } = props.event

	return (
		<div>
			<span 
				title={`${title} por [${name}]`}
			>{title}</span>
		</div>
	)
}