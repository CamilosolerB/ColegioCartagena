function login() {
  Swal.fire({
      //
    icon: "error",
    title: "Oops...",
    text: datos.Error,
    timer: 2000,
  });
}


function showpassword(){
  let password=document.getElementById('password');
    if(password.type === 'text'){
      password.type='password';
    }
    else{
      password.type = 'text'
    }
}

var password = document.getElementById('pass');
password.addEventListener('click',showpassword);

//var datos = document.getElementById("enviar");

//datos.addEventListener("click", login);
