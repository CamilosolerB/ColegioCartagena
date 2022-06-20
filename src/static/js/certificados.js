function generarpago(){
    Swal.fire({
        title: '¿Estas seguro de solicitar el certificado?',
        showCancelButton: true,
        confirmButtonText: 'Look up',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          return fetch('/students/documento')
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
              return response.json()
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'certificado generado correctamente',
                showConfirmButton: false,
                timer: 1500
              })
        }
      })
}
let boton = document.getElementById('boton');

boton.addEventListener('click',generarpago)