function generarpago(){
    let email = document.getElementById('correo').value;
    let telefono = document.getElementById('telefono').value;
    const data = {
        email: email,
        telefono: telefono
    }
    fetch('/students/certificados',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        Swal.fire({
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          })
          window.location.reload()
    }
    )
}
let boton = document.getElementById('boton');

boton.addEventListener('click',generarpago)