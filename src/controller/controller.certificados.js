const controller = {};
const mysql = require("../database");

controller.generarpago = (req, res) => {
  if (req.session.active) {
    const {email} = req.body;
    req.session.emacert = email;
    fetch('https://biz.payulatam.com/B0ed748C3291AE5')
  } else {
    res.render("login", {
      Error: "Usted no tiene las credenciales para acceder a este sitio",
    });
  }
};

module.exports = controller;
