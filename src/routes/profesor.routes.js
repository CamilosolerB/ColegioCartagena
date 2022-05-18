const express = require("express");
const router = express.Router();
const mysql = require("../database");
const controller = require("../controller/controller.profesor");
const multer = require("multer");

//uso de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/static/profesor");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        req.session.identificacion +
        "-" +
        Date.now() +
        ".png"
    );
  },
});
const uploads = multer({ storage });

router.post("/nuevoprofesor", uploads.single("foto"), (req, res) => {
  if (req.session.active) {
    const { cedula, correo, clave } = req.body;
    const data = {
      idusuarios: cedula,
      Correo: correo,
      Clave: clave,
      activo: 1,
      rol: "profesor",
      foto: "../profesor/" + req.file.filename,
    };
    mysql.query("Insert into usuario set?", [data], (err) => {
      if (err) {
        throw err;
      } else {
        const { nombre, apellido, telefono, direccion } = req.body;
        const usuario = {
          Codigoprofesor: cedula,
          Cedulaprofesor: cedula,
          Nombreprofesor: nombre,
          Apellidoprofesor: apellido,
          Telefono: telefono,
          Direccion: direccion,
        };
        mysql.query("Insert into docente set?", [usuario], (err) => {
          if (err) {
            throw err;
          } else {
            res.redirect("/admin/profesores");
          }
        });
      }
    });
  } else {
    res.render("login", {
      Error: "Usted no tiene las credenciales para acceder a este sitio",
    });
  }
});
router.get('/admin/:id',controller.getprofesor);
router.put('/inactivar',controller.inactivarprofesor);
router.put('/activar',controller.activarprofesor);
module.exports = router;
