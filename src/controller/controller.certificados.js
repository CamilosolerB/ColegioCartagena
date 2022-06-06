const controller = {};
const mysql = require("../database");
const nequiClient = require("nequi")('7t101b6720c55re8q3hf5fffk4','1dtj183feqh9cb88tnma5glhkl69c571iqkmljji21qko98e6mnr','n0AJWPT9EVaz2ucvPjAMW3NKm7HttqWXaXCqjtAy')

controller.generarpago = (req, res) => {
  if (req.session.active) {
    const {telefono, email} = req.body;
    req.session.emacert = email;
    nequiClient.pushPayments.create({
      phoneNumber: telefono,
      code: '1',
      value: '100'
    },
    function(err,response){
      if(err){
        throw err;
      }
      else{
        console.log(response);
        res.redirect(307,'/respuestas/sendemail')
      }
    })
  } else {
    res.render("login", {
      Error: "Usted no tiene las credenciales para acceder a este sitio",
    });
  }
};

module.exports = controller;
