function login() {
  Swal.fire({
      //
    icon: "error",
    title: "Oops...",
    text: datos.Error,
    timer: 2000,
  });
}

var datos = document.getElementById("enviar");

datos.addEventListener("click", login);
