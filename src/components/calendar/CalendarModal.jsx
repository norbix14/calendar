import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import DateTimePicker from 'react-datetime-picker'
import moment from 'moment'
import {
	eventClearActive,
	startEventAdd,
	startEventUpdate
} from '../../actions/events'
import { uiCloseModal } from '../../actions/ui'
import { modalCustomStyles } from '../../helpers/react-modal-helpers'
import { Toast } from '../../utils/SweetAlert'

Modal.setAppElement('#root')

const defaultDateNow = moment().minutes(0).seconds(0).add(1, 'hours')
const defaultDateNowPlusOne = defaultDateNow.clone().add(1, 'hours')

const initialEvent = {
	title: '',
	notes: '',
	start: defaultDateNow.toDate(),
	end: defaultDateNowPlusOne.toDate()
}

export default function CalendarModal() {
	const dispatch = useDispatch()

	const { active } = useSelector((state) => state.calendar)
	const { modalOpen } = useSelector((state) => state.ui)

	const [ startDate, setStartDate ] = useState(defaultDateNow.toDate())
	const [ endDate, setEndDate ] = useState(defaultDateNowPlusOne.toDate())
	const [ formValues, setFormValues ] = useState(initialEvent)
	const [ validTitle, setValidTitle ] = useState(true)

	const { title, notes, start, end } = formValues


	const afterOpenModal = () => {}

	const closeModal = () => {
		dispatch(uiCloseModal())
		dispatch(eventClearActive())
		setFormValues(initialEvent)
	}

	const handleStartDateChange = (e) => {
		setStartDate(e)
		setFormValues({
			...formValues,
			start: e
		})
	}

	const handleEndDateChange = (e) => {
		setEndDate(e)
		setFormValues({
			...formValues,
			end: e
		})
	}

	const handleInputChange = (e) => {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value
		})
	}

	const handleFormSubmit = (e) => {
		e.preventDefault()
		const momentStart = moment(start)
		const momentEnd = moment(end)
		if(momentStart.isSameOrAfter(momentEnd)) {
			return Toast('warning', 'La fecha de fin debe ser mayor a la de inicio')
		}
		if(title.trim() === '' || title.trim().length < 4) {
			return setValidTitle(false)
		}
		setValidTitle(true)
		if(active) {
			dispatch(startEventUpdate(formValues))
		} else {
			dispatch(startEventAdd(formValues))
		}
		closeModal()
	}

	useEffect(() => {
		if(active) {
			setFormValues(active)
		} else {
			setFormValues(initialEvent)
		}
	}, [active, setFormValues])

	return (
		<Modal
			className="modal"
			overlayClassName="modal-fondo"
      contentLabel="Example Modal"
			closeTimeoutMS={200}
			isOpen={modalOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={modalCustomStyles}
		>
			<h2>{ active ? 'Editar evento' : 'Nuevo evento' }</h2>
			<hr />
			<form 
				className="container"
				onSubmit={handleFormSubmit}
			>
				<div className="form-group">
				  <label htmlFor="start-date">Fecha y hora inicio</label>
				  <DateTimePicker
				  	id="start-date"
				  	className="form-control"
		        onChange={handleStartDateChange}
		        value={startDate}
		      />
				</div>

				<div className="form-group">
				  <label htmlFor="end-date">Fecha y hora fin</label>
				  <DateTimePicker
				  	id="end-date"
				  	className="form-control"
		        onChange={handleEndDateChange}
		        value={endDate}
		      />
				</div>

				<hr />
				<div className="form-group">
				  <label htmlFor="title">Título</label>
				  <input 
			      type="text" 
			      placeholder="Título del evento"
			      name="title"
			      id="title"
			      autoComplete="off"
			      className={`form-control ${!validTitle && 'is-invalid'}`}
			      value={title}
			      onChange={handleInputChange}
				  />
				  <small 
				  	id="emailHelpDescription" 
				  	className="form-text text-muted"
				  >Una descripción corta</small>
				</div>

				<div className="form-group">
				<label htmlFor="notes">Notas</label>
				  <textarea 
			      type="text" 
			      className="form-control"
			      placeholder="Notas sobre el evento"
			      rows="5"
			      name="notes"
			      id="notes"
			      value={notes}
			      onChange={handleInputChange}
				  ></textarea>
				  <small 
				  	id="emailHelpInfo" 
				  	className="form-text text-muted"
				  >Información adicional</small>
				</div>

				<button
				  type="submit"
				  className="btn btn-outline-primary btn-block"
				>
				  <i className="far fa-save"></i>
				  <span> Guardar</span>
				</button>
			</form>
		</Modal>
	)
}