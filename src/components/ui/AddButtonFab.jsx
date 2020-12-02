import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'

export default function AddButtonFab() {
	const dispatch = useDispatch()

	const handleOpenModal = () => {
		dispatch(uiOpenModal())
	}

	return (
		<button 
			type="button"
			className="btn btn-primary fab fab-add"
			title="New event"
			onClick={handleOpenModal}
		>
			<i className="fas fa-plus"></i>
		</button>
	)
}