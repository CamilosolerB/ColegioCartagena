const express = require("express");
const router = express.Router();
const controller = require("../controller/controller.student");
const pago = require('../controller/controller.certificados')
const mysql = require("../database");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/static/students");
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

router.post("/nuevoestudiante", uploads.single("foto"), (req, res) => {
  if (req.session.active) {
    const { cedula, correo, clave } = req.body;
    const data = {
      idusuarios: cedula,
      Correo: correo,
      Clave: clave,
      activo: 1,
      rol: "estudiante",
      foto: "../students/" + req.file.filename,
    };
    mysql.query("Insert into usuario set?", [data], (err) => {
      if (err) {
        throw err;
      } else {
        const {
          nombre,
          apellido,
          telefono,
          direccion,
          edad,
          tiposangre,
          fecnac,
          curso,
        } = req.body;
        const usuario = {
          Documentoestudiante: cedula,
          Nombre: nombre,
          Apellido: apellido,
          Edad: edad,
          Telefono: telefono,
          Direccion: direccion,
          TipoDeSangre: tiposangre,
          Fechanacimiento: fecnac,
        };
        mysql.query("Insert into estudiante set?", [usuario], (err) => {
          if (err) {
            throw err;
          } else {
            const course = {
              idestudiante: cedula,
              idcurso: curso,
            };
            mysql.query("Insert into estudiantecurso set?", [course], (err) => {
              if (err) {
                throw err;
              } else {
                res.redirect("/admin/estudiantes");
              }
            });
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
router.post('/certificados',pago.generarpago);
router.post('/actualizar',controller.actualizardatos);
router.post('/agregarpapa',controller.insertarpadre);
router.get("/admin/:id", controller.getestudiantes);
router.get('/excusas',controller.verexcusa);
router.get('/mis_datos',controller.showdata);
router.get('/certificados',controller.getcertificados);
router.get('/documento',pago.generarpdf);
router.get('/padres',controller.getpadres);
router.get('/notas',controller.vermisnotas);
module.exports = router;
