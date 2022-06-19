$(document).ready(function(){
  $('#table').DataTable();
  $('.btn.btn-primary').on('click', function(){
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        let boton=$('.btn.btn-primary').index(this)-1;
        let _id=$("[name='_id']").eq(boton).val();
        let Nota1=$("[name='nota1']").eq(boton).val();
        let Nota2=$("[name='nota2']").eq(boton).val();
        let Nota3=$("[name='nota3']").eq(boton).val();
        let Nota4=$("[name='nota4']").eq(boton).val();
        let Nota5=$("[name='nota5']").eq(boton).val();
        let Nota6=$("[name='nota6']").eq(boton).val();
        let Promedio=$("[name='promedio']").eq(boton).val();
        $.ajax({
          type: "PUT",
          url: "/profesor/"+_id,
          data: {
            Nota1:Nota1,Nota2:Nota2,Nota3:Nota3,Nota4:Nota4,Nota5:Nota5,Nota6:Nota6,Promedio:Promedio
          },
          success: function (response) {
            Swal.fire('Saved!', response.message, 'success')
          }
        });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  })
});  
//
function subirexcel() {
  Swal.fire({
    title: "¿Estas seguro de subir estas notas?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    denyButtonText: `No guardar`,
  }).then((result) => {
    if (result.isConfirmed) {
      let file = document.getElementById("notas");
      var formData = new FormData();
      formData.append("notas", file.files[0]);
      fetch("/profesor/subirnotas", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          Swal.fire("Guardando", result.message, "success");
          window.location.reload()
        });
    } else if (result.isDenied) {
      Swal.fire("Cancelado", "Cancelado correctamente", "error");
    }
  });
}

let upload = document.getElementById("upload");
upload.addEventListener("click", subirexcel);
