import { useState } from 'react'

export default function useInputHandler(initialState = {}) {
	const [ values, setValues ] = useState(initialState)

	const handleInputChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value
		})
	}

	return [ values, handleInputChange ]
}