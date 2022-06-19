const controller = {};
const mysql = require("../database");
const multer = require('multer');
const notas = require('../models/notas');

controller.getprofesor = (req, res) => {
  if (req.session.active) {
    if (Object.keys(req.params).length === 0) {
      const id = req.session.identificacion;
      mysql.query(
        "Select * from docente inner join usuario on (Codigoprofesor=idusuarios) Where Codigoprofesor=?",
        [id],
        (err, resbd) => {
          if (err) {
            throw err;
          } else {
            console.log(req.session)

            const data = {
              rol: req.session.rol,
              foto: req.session.image,
            };
            res.render("docente/infopersonal", {
              usuario: data,
              admin: { Nombre: req.session.nombre, Apellido: req.session.apellido},
              response: resbd,
            });
          }
        }
      );
    } else {
      const { id } = req.params;
      mysql.query(
        "Select * from docente inner join usuario on (Codigoprofesor=idusuarios) Where Codigoprofesor=?",
        [id],
        (err, resbd) => {
          if (err) {
            throw err;
          } else {
            console.log(resbd)
            const data = {
              rol: req.session.rol,
              foto: req.session.image,
            };
            res.render("admin/personaindividual", {
              usuario: data,
              admin: { Nombre: req.session.nombre },
              response: resbd,
            });
          }
        }
      );
    }
  }
  else {
    res.render("login", {
      Error: "Usted no tiene las credenciales para acceder a este sitio",
    });
  }
};
controller.inactivarprofesor = (req, res) => {
  if (req.session.active) {
    const { valor } = req.body;
    mysql.query(
      "Update usuario Set activo=0 Where idusuarios=?",
      [valor],
      (err) => {
        if (err) {
          throw err;
        } else {
          res.json({ status: "El Usuario ha sido inactivado correctamente" });
        }
      }
    );
  }
  else {
    res.render("login", {
      Error: "Usted no tiene las credenciales para acceder a este sitio",
    });
  }
};

controller.activarprofesor = (req, res) => {
  if (req.session.active) {
    const { valor } = req.body;
    mysql.query(
      "Update usuario Set activo=1 Where idusuarios=?",
      [valor],
      (err) => {
        if (err) {
          throw err;
        } else {
          res.json({ status: "El Usuario ha sido activado correctamente" });
        }
      }
    );
  }
  else {
    res.render("login", {
      Error: "Usted no tiene las credenciales para acceder a este sitio",
    });
  }
};

controller.mostrarprofesores = (req, res) => {
  if (req.session.active) {
    mysql.query("Select * from docente", (err, resbd) => {
      if (err) {
        throw err;
      } else {
        mysql.query("Select * from materias", (err, resp) => {
          if (err) {
            throw err;
          } else {
            res.json({
              datas: resbd,
              materias: resp,
            });
          }
        });
      }
    });
  }
  else {
    res.render("login", {
      Error: "Usted no tiene las credenciales para acceder a este sitio",
    });
  }
};

controller.asignarcurso = (req, res) => {
  if(req.session.active){
    const { nombre, materia, curso } = req.body;
    const cursodocente = {
      idcursdoc: curso,
      iddocente: nombre,
    };
    mysql.query("Insert into cursodocente set?", [cursodocente], (err) => {
      if (err) {
        throw err;
      } else {
        const materias = {
          idprofmat: nombre,
          idmatprof: materia,
          idcursmat: curso,
        };
        mysql.query(
          "Insert into `materias-profesor` set?",
          [materias],
          (error) => {
            if (error) {
              throw error;
            } else {
              res.json({ message: "insertado correctamente" });
            }
          }
        );
      }
    });
  }
  else {
    res.render("login", {
      Error: "Usted no tiene las credenciales para acceder a este sitio",
    });
  }
};

controller.vermiscursos=(req,res)=>{
  if(req.session.active){
    const id = req.session.identificacion;
    mysql.query('select * from `materias-profesor` inner join materias on (idmatprof=Idmateria) where idprofmat=?',[id],(err,resbd)=>{
      if(err){
        throw err
      }
      else{
        const data = {
          rol: req.session.rol,
          foto: req.session.image,
        };
        res.render('docente/cursos',{
          curso: resbd,
          usuario: data,
          admin: { Nombre: req.session.nombre }});
      }
    })
  }
  else {
    res.render("login", {
      Error: "Usted no tiene las credenciales para acceder a este sitio",
    });
  }
}

controller.verexcusa=(req,res)=>{
  if(req.session.active){
    mysql.query('Select * From excusas Where numdoc=?',[req.session.identificacion],(err,resp)=>{
      if(err){
        throw err
      }
      else{
        const data = {
          rol: req.session.rol,
          foto: req.session.image,
        };
        res.render('docente/excusas',{
          data: resp,
          usuario: data,
          admin: { Nombre: req.session.nombre }
        })
      }
    })
  }
  else {
    res.render("login", {
      Error: "Usted no tiene las credenciales para acceder a este sitio",
    });
  }
}
controller.cursoindi=(req,res)=>{
  if(req.session.active){
    const {id} = req.params;
    req.session.course = id
    const data = {
      rol: req.session.rol,
      foto: req.session.image,
    };
    mysql.query('Select * from `materias-profesor` inner join materias on (idmatprof=Idmateria) Where idprofmat=? AND idcursmat=?',[req.session.identificacion,id],(err,resbb)=>{
      if(err){
        throw err;
      }
      else{
        req.session.materia = resbb[0].Idmateria;
        notas.find({profesor:req.session.identificacion,curso:req.session.course,materia:req.session.materia},function(err,docs){
          if(err){
            throw err;
          }
          else{
            console.log(req.session);
            res.render('docente/cursosindi',{
              usuario: data,
              admin: { Nombre: req.session.nombre },
              notas: docs
            })
          }
        })
      }
    })
  }
  else {
    res.render("login", {
      Error: "Usted no tiene las credenciales para acceder a este sitio",
    });
  }
}
//
module.exports = controller;
