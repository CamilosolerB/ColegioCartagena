$(document).ready(function(){
  $('#table').DataTable();
});  
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
