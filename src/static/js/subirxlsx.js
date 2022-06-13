$(document).ready(function(){
  $('#table').DataTable();
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
        });
    } else if (result.isDenied) {
      Swal.fire("Cancelado", "Cancelado correctamente", "error");
    }
  });
}

function traernotas(event) {
  event.preventDefault();
  fetch("/profesor/traer_notas")
    .then((res) => res.json())
    .then((query) => {
      console.log(query);
      let tbody = $('tbody');
      tbody.html('');
      query.forEach(notas=>{
        tbody.append(
          `
        <tr>
          <td>${notas.Idenficacion}<td>
          <td>${notas.NombreCompleto}<td>
          <td>${notas.Nota1}<td>
          <td>${notas.Nota2}<td>
          <td>${notas.Nota3}<td>
          <td>${notas.Nota4}<td>
          <td>${notas.Nota5}<td>
          <td>${notas.Nota6}<td>
          <td>${notas.Promedio}<td>
        </tr>
      `)
      })
    })
    .catch((err) => console.log(err));
}
let get = document.getElementById("traer");
get.addEventListener("click", traernotas);

let upload = document.getElementById("upload");
upload.addEventListener("click", subirexcel);
});