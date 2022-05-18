


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

