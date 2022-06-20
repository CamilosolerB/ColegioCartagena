function generarpago(){
    fetch('/students/documento')
    .then(response => response.json())
    .then(data => {
        Swal.fire({
            icon: 'success',
            title: 'certificado generado correctamente',
            showConfirmButton: false,
            timer: 1500
          })
    }
    )
}
let boton = document.getElementById('boton');

boton.addEventListener('click',generarpago)