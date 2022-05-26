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
    fetch('/profesor/verprofesor')
    .then(response => response.json())
    .then(function(data){
      let profesor = [];
      Object.keys(data).forEach(key =>{
        if(key=='datas'){
          profesor.push({profe: data[key]})
        }
      })
        var list = profesor.map(function(data){
          let valores = data.Nombreprofesor+" "+data.Apellidoprofesor;
          return valores;
        })
      console.log(profesor)
      Swal.fire({
        title: 'Selecciona el profesor y la materia',
        input: 'select',
        inputOptions: ""
        ,
        inputPlaceholder: 'Nombre del profesor',
        showCancelButton: true,
      })
    }
    )
  }
    




