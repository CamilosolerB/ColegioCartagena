const express = require("express");
const router = express.Router();
const mysql = require("../database");
const multer = require("multer");
const controllers = require('../controller/controller.excusas');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/static/excusas/docente");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        req.session.identificacion +
        "-" +
        Date.now() +
        ".pdf"
    );
  },
});
const uploads = multer({ storage });
//a
router.post("/profesor", uploads.single("pdf"), (req, res) => {
  if (req.session.active) {
    console.log(req.body);
    const { dia } = req.body;
    mysql.query("Select MAX(id) as id From excusas", (err, resbd) => {
      if (err) {
        res.send(err);
      } else {
        console.log(req.file);
        const id = resbd[0].id + 1;
        const data = {
          id: id,
          numdoc: req.session.identificacion,
          Documentopdf:
            "./src/static/excusas/docente/" + req.file.filename,
          fecha: dia,
        };
        mysql.query("Insert into excusas set?", [data], (err) => {
          if (err) {
            res.send(err);
          } else {
            if (req.session.rol=='profesor') {
              var foo = {
                idexcusasdoc: id,
                idprofesor: req.session.identificacion,
              };
              var query = "Insert into `docente-excusas` set?"
              var redirec = '/profesor/excusas'
            } else {
              var foo = {
                idexcusa: id,
                excdocestudiante: req.session.identificacion,
              };
              var query = "Insert into `estudiante-excusas` set?"
              var redirec = '/students/excusas'
            }
            mysql.query(query,[foo],(error) => {
                if (error) {
                  res.send(error);
                } else {
                  res.redirect(redirec);
                }
              }
            );
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

router.get("/verdocumento/:id",controllers.verpdfprofesor);
module.exports = router;
