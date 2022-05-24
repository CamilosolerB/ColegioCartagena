const controller = {};
const mysql = require("../database");

/* A function that is called when the user is logged in and is redirected to the profile page. */
controller.veradministrador = (req, res) => {
  if (req.session.active) {
    const id = req.session.identificacion;
    mysql.query(
      "Select * from administrador where id=?",
      [id],
      (err, resbd) => {
        mysql.query(
          "Select * from usuario where idusuarios=?",
          [id],
          (err, data) => {
            if (err) {
              throw err;
            } else {
              res.render("admin/perfil", { usuario: data, admin: resbd });
            }
          }
        );
      }
    );
  } else {
    res.render("login", {
      Error: "Usted no tiene las credenciales para acceder a este sitio",
    });
  }
};
/* A function that is called when the user is logged in and is redirected to the profile page. */
controller.profesores = (req, res) => {
  /* Checking if the user is logged in and if it is, it is rendering the page. */
  if (req.session.active) {
    mysql.query("Select * from docente inner join usuario on (Codigoprofesor=idusuarios)", (err, resbd) => {
      if (err) {
        throw err;
      } else {
        const data = {
          rol: req.session.rol,
          foto: req.session.image,
        };
        res.render("admin/profesores", {
          usuario: data,
          admin: { Nombre: req.session.nombre },
          response: resbd
        });
      }
    });
  } else {
    res.render("login", {
      Error: "Usted no tiene las credenciales para acceder a este sitio",
    });
  }
};

controller.estudiantes = (req, res) => {
  /* Checking if the user is logged in and if it is, it is rendering the page. */
  if (req.session.active) {
    mysql.query('Select * from estudiante inner join usuario on (Documentoestudiante=idusuarios)',(err,resbd)=>{
      mysql.query('Select * from curso',(err,sendm)=>{
        if(err){
          res.send(err)
        }
        else{
          const data = {
            rol: req.session.rol,
            foto: req.session.image,
          };
          res.render("admin/estudiantes", {
            usuario: data,
            admin: { Nombre: req.session.nombre },
            response: resbd,
            curso: sendm
          });
        }
      })
    })
  } else {
    res.render("login", {
      Error: "Usted no tiene las credenciales para acceder a este sitio",
    });
  }
};

controller.admins = (req, res) => {
  /* Checking if the user is logged in and if it is, it is rendering the page. */
  if (req.session.active) {
    mysql.query('Select * from administrador inner join usuario on (id=idusuarios)',(err,resbd)=>{
      if(err){
        throw err
      }
      else{
        const data = {
          rol: req.session.rol,
          foto: req.session.image,
        };
        res.render("admin/admins", {
          usuario: data,
          admin: { Nombre: req.session.nombre },
          response: resbd
        });
      }
    })
  } else {
    res.render("login", {
      Error: "Usted no tiene las credenciales para acceder a este sitio",
    });
  }
};

controller.cursos = (req, res) => {
  /* Checking if the user is logged in and if it is, it is rendering the page. */
  if (req.session.active) {
    mysql.query('Select * from curso inner join gradoscursos on (Codigocurso=idcurso)',(err,resbd)=>{
      if(err){
        throw err
      }
      else{
        const data = {
          rol: req.session.rol,
          foto: req.session.image,
        };
        res.render("admin/cursos", {
          usuario: data,
          admin: { Nombre: req.session.nombre },
          curso: resbd
        });
      }
    })
  } else {
    res.render("login", {
      Error: "Usted no tiene las credenciales para acceder a este sitio",
    });
  }
};
controller.certificados = (req, res) => {
  /* Checking if the user is logged in and if it is, it is rendering the page. */
  if (req.session.active) {
    mysql.query('Select * from pagos',(err,resbd)=>{
      if (err) {
        throw err
      } else {
        const data = {
          rol: req.session.rol,
          foto: req.session.image,
        };
        res.render("admin/certificados", {
          usuario: data,
          admin: { Nombre: req.session.nombre },
          pagos: resbd
        });
      }
    })
  } else {
    res.render("login", {
      Error: "Usted no tiene las credenciales para acceder a este sitio",
    });
  }
};
controller.getadministrador=(req,res)=>{
  if(req.session.active){
  const {id} = req.params;
  mysql.query('Select * from administrador inner join usuario on (id=idusuarios) Where id=?',[id],(err,resbd)=>{
      if (err) {
          throw err;
        } else {
          const data = {
            rol: req.session.rol,
            foto: req.session.image,
          };
          res.render("admin/personaindividual", {
            usuario: data,
            admin: { Nombre: req.session.nombre },
            response: resbd
          });
        }
  })
  }
}
controller.vistacatalogo = (req, res) => {
  /* Checking if the user is logged in and if it is, it is rendering the page. */
  if (req.session.active) {
    mysql.query('Select * from curso inner join gradoscursos on (Codigocurso=idcurso)',(err,resbd)=>{
      if(err){
        throw err
      }
      else{
        const data = {
          rol: req.session.rol,
          foto: req.session.image,
        };
        res.render("admin/catalogocurso", {
          usuario: data,
          admin: { Nombre: req.session.nombre },
          curso: resbd
        });
      }
    })
  } else {
    res.render("login", {
      Error: "Usted no tiene las credenciales para acceder a este sitio",
    });
  }
};
module.exports = controller;
