import React from 'react'
import { useDispatch } from 'react-redux'
import { startEventDelete } from '../../actions/events'
import { SwalDelete } from '../../utils/SweetAlert'

export default function DeleteButtonFab() {
	const dispatch = useDispatch()

	const handleDelete = () => {
		SwalDelete(() => {
			dispatch(startEventDelete())
		})
	}

	return (
		<button 
			type="button"
			className="btn btn-danger fab fab-delete"
			title="Delete event"
			onClick={handleDelete}
		>
			<i className="fas fa-trash"></i>
		</button>
	)
}