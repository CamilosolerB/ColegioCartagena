function inactivar() {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "¿Quieres inactivar a este profesor?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, inactivar'
    }).then((result) => {
      if (result.isConfirmed) {
          let id = document.getElementById('inactivar').value;
          fetch('/profesor/inactivar',{
              method:'PUT',
              headers:{
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({id})
          })
          .then(data =>{
            Swal.fire(
                'Exito',
                data.status,
                'success'
              )
            window.location.reload()
          })
          .catch(
              (err) => console.log(err)
          )
      }
    })
  }

  function activar() {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "¿Quieres activar a este profesor?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, activar'
    }).then((result) => {
      if (result.isConfirmed) {
          let id = document.getElementById('activar').value;
          fetch('/profesor/activar',{
              method:'PUT',
              headers:{
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({id})
          })
          .then(data =>{
            Swal.fire(
                'Exito',
                data.status,
                'success'
              )
            window.location.reload()
          })
          .catch(
              (err) => console.log(err)
          )
      }
    })
  }

  function agregarprofesor(){
    const nombre = document.getElementById('nombre').value
    const materia = document.getElementById('materia').value
    const curso = document.getElementById('curso').value
    const data = {
      nombre:nombre,materia:materia,curso:curso
    }
    fetch('/profesor/insertarmateriaprofesor',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(function(data){
      console.log(data)
      Swal.fire({
        icon: 'success',
        title: data['message'],
        showConfirmButton: false,
        timer: 1000
      });
      window.location.reload()
    }
    )
  }

let agregar = document.getElementById('verprofesores');

agregar.addEventListener('click',agregarprofesor);
    




