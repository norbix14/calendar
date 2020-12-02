import Swal from 'sweetalert2'

export const SweetAlert = (icon = 'success', title = 'Correcto') => {
	return Swal.fire({
	  position: 'top-end',
	  icon,
	  title,
	  showConfirmButton: false,
	  timer: 3000,
	  showClass: {
	  	popup: 'animate__animated animate__fadeInDown'
	  },
	  hideClass: {
	  	popup: 'animate__animated animate__fadeOutRight'
	  }
	})
}

export const Toast = (icon = 'success', title = 'Correcto') => {
	const toast = Swal.mixin({
		toast: true,
	  position: 'top-end',
	  showConfirmButton: false,
	  timer: 3000,
	  timerProgressBar: true,
	  showClass: {
	  	popup: 'animate__animated animate__fadeInDown'
	  },
	  hideClass: {
	  	popup: 'animate__animated animate__fadeOutRight'
	  },
	  didOpen: (toast) => {
	    toast.addEventListener('mouseenter', Swal.stopTimer)
	    toast.addEventListener('mouseleave', Swal.resumeTimer)
	  }
	})
	return toast.fire({ icon, title })
}

export const SwalDelete = async (callback) => {
	const result = await Swal.fire({
		title: '¿Quieres eliminar esto?',
		text: 'No se puede revertir',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Si, borrarlo',
		cancelButtonText: 'No, dejarlo',
		showClass: {
			popup: 'animate__animated animate__fadeInDown'
		},
		hideClass: {
			popup: 'animate__animated animate__fadeOutRight'
		}
	})
	if (result.isConfirmed) {
		return callback()
	}
}
