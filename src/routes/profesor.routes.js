const express = require("express");
const router = express.Router();
const mysql = require("../database");
const controller = require("../controller/controller.profesor");
const files = require("../controller/controller.xlsx");
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

//archivos
const almacen = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/static/certificados/docente");
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
const upload = multer({ storage: almacen });
//a
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
router.post('/cambiardatos', uploads.single('foto'), (req,res)=>{
  if(req.session.active){
    const cedula = req.session.identificacion;
    const {correo, clave } = req.body;
    if(req.file==undefined){
      mysql.query('Update usuario set Correo="'+correo+'", Clave="'+clave+'" where idusuarios="'+cedula+'"', (err) => {
        if (err) {
          throw err;
        } else {
          const { nombre, apellido, telefono, direccion } = req.body;
          mysql.query('Update docente set Nombreprofesor="'+nombre+'",Apellidoprofesor="'+apellido+'",Telefono="'+telefono+'",Direccion="'+direccion+'" Where Codigoprofesor="'+cedula+'"', (err) => {
            if (err) {
              throw err;
            } else {
              res.redirect("/profesor/misdatos");
            }
          });
        }
      }); 
    }
    else{
      console.log(req.file);
      mysql.query('Update usuario set Correo="'+correo+'", Clave="'+clave+'", foto="'+"../profesor/" + req.file.filename+'" where idusuarios="'+cedula+'"', (err) => {
        if (err) {
          throw err;
        } else {
          const { nombre, apellido, telefono, direccion } = req.body;
          mysql.query('Update docente set Nombreprofesor="'+nombre+'",Apellidoprofesor="'+apellido+'",Telefono="'+telefono+'",Direccion="'+direccion+'" Where Codigoprofesor="'+cedula+'"', (err) => {
            if (err) {
              throw err;
            } else {
              res.redirect("/profesor/misdatos");
            }
          });
        }
      }); 
    }
  } else {
    res.render("login", {
      Error: "Usted no tiene las credenciales para acceder a este sitio",
    });
  }
});
router.get('/generarexcel',files.crearlista);
router.post('/subirnotas',files.subirarchivos);
router.put('/actualizar/:id',files.actualizarnotas);
router.get('/admin/:id',controller.getprofesor);
router.get('/misdatos',controller.getprofesor);
router.get('/verprofesor',controller.mostrarprofesores);
router.get('/cursos',controller.vermiscursos);
router.get('/excusas',controller.verexcusa);
router.get('/cursos/:id',controller.cursoindi)
router.put('/inactivar',controller.inactivarprofesor);
router.put('/activar',controller.activarprofesor);
router.post('/insertarmateriaprofesor',controller.asignarcurso);
module.exports = router;
