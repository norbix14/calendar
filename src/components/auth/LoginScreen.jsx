import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './login.css'
import useInputHandler from '../../hooks/useInputHandler'
import {
	startLogin,
	startRegister
} from '../../actions/auth'
import addAnimClass from '../../utils/AddAnimateClass'
import { Toast } from '../../utils/SweetAlert'

export default function LoginScreen() {
	const dispatch = useDispatch()

	const [ visibleFormLogin, setVisibleFormLogin ] = useState(false)
	const [ visibleFormRegister, setVisibleFormRegister ] = useState(false)

	const [ loginValues, handleInputChangeLogin ] = useInputHandler({
		email: '',
		password: ''
	})
	const {
		email: loginEmail, 
		password: loginPassword 
	} = loginValues

	const [ registerValues, handleInputChangeRegister ] = useInputHandler({
		name: '',
		email: '',
		password: '',
		confirm: ''
	})
	const {
		name, 
		email: registerEmail, 
		password: registerPassword, 
		confirm 
	} = registerValues

	const showLoginForm = () => {
		setVisibleFormLogin(prev => !prev)
		setVisibleFormRegister(false)
	}

	const showRegisterForm = () => {
		setVisibleFormLogin(false)
		setVisibleFormRegister(prev => !prev)
	}

	const handleLoginSubmit = (e) => {
		e.preventDefault()
		dispatch(startLogin(loginEmail, loginPassword))
	}

	const handleRegisterSubmit = (e) => {
		e.preventDefault()
		if(registerPassword !== confirm) {
			return Toast('warning', 'Las contraseñas deben ser iguales')
		}
		dispatch(startRegister(name, registerEmail, registerPassword))
	}

	return (
		<div className="container login-container">
			<div className="row mb-3">
			  <div className="col-md-6 login-form-1">
			  	<button 
			  		type="button"
			  		className={
			  			`btn btn-block ${
			  				visibleFormLogin ? 'btn-success' : 'btn-outline-success'
			  			} mb-3`
			  		}
			  		onClick={showLoginForm}
			  	>Ingreso</button>
					<form 
						className={
							`${visibleFormLogin ? addAnimClass('fadeIn') : addAnimClass('fadeOut') + 'd-none'}`
						}
						onSubmit={handleLoginSubmit}
					>
					  <div className="form-group">
				      <input 
			          type="email"
			          name="email"
			          className="form-control"
			          placeholder="Email"
			          onChange={handleInputChangeLogin}
			          value={loginEmail}
				      />
					  </div>
					  <div className="form-group">
				      <input
			          type="password"
			          name="password"
			          className="form-control"
			          placeholder="Contraseña (mínimo de 6 caracteres)"
			          onChange={handleInputChangeLogin}
			          value={loginPassword}
				      />
					  </div>
					  <div className="form-group">
				      <input 
			          type="submit"
			          className="btnSubmit"
			          value="Login" 
				      />
					  </div>
					</form>
			  </div>

			  <div className="col-md-6 login-form-2">
			  	<button 
			  		type="button"
			  		className={
			  			`btn btn-block ${
			  				visibleFormRegister ? 'btn-success' : 'btn-outline-success'
			  			} mb-3`
			  		}
			  		onClick={showRegisterForm}
			  	>Registro</button>
					<form 
						className={
							`${visibleFormRegister ? addAnimClass('fadeIn') : addAnimClass('fadeOut') + 'd-none'}`
						}
						onSubmit={handleRegisterSubmit}
					>
					  <div className="form-group">
				      <input
			          type="text"
			          name="name"
			          className="form-control"
			          placeholder="Nombre"
			          onChange={handleInputChangeRegister}
			          value={name}
				      />
					  </div>
					  <div className="form-group">
				      <input
			          type="email"
			          name="email"
			          className="form-control"
			          placeholder="Email"
			          onChange={handleInputChangeRegister}
			          value={registerEmail}
				      />
					  </div>
					  <div className="form-group">
				      <input
			          type="password"
			          name="password"
			          className="form-control"
			          placeholder="Contraseña (mínimo de 6 caracteres)" 
			          onChange={handleInputChangeRegister}
			          value={registerPassword}
				      />
					  </div>

					  <div className="form-group">
				      <input
			          type="password"
			          name="confirm"
			          className="form-control"
			          placeholder="Repetir contraseña" 
			          onChange={handleInputChangeRegister}
			          value={confirm}
				      />
					  </div>

					  <div className="form-group">
				      <input 
			          type="submit" 
			          className="btnSubmit" 
			          value="Crear cuenta" 
				      />
					  </div>
					</form>
			  </div>
			</div>
  	</div>
	)
}