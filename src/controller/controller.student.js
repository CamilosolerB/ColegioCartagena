const controller = {}
const mysql = require('../database');
const multer = require("multer");
const notas = require('../models/notas');
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

controller.getestudiantes=(req,res)=>{
    if(req.session.active){
    const {id} = req.params;
    mysql.query('Select * from estudiante inner join usuario on (Documentoestudiante=idusuarios) Where Documentoestudiante=?',[id],(err,resbd)=>{
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
    else {
      res.render("login", {
        Error: "Usted no tiene las credenciales para acceder a este sitio",
      });
    }
};
controller.showdata=(req,res)=>{
  if(req.session.active){
    mysql.query('Select * from estudiante inner join usuario on (Documentoestudiante=idusuarios) Where Documentoestudiante=?',[req.session.identificacion],(err,resbd)=>{
      if(err){
        throw err;
      }
      else{
        const data = {
          rol: req.session.rol,
          foto: req.session.image,
        };
        res.render("estudiante/infopersonal", {
          usuario: data,
          admin: { Nombre: req.session.nombre, Apellido: req.session.apellido },
          response: resbd
        });
      }
    })
  }
  else {
    res.render("login", {
      Error: "Usted no tiene las credenciales para acceder a este sitio",
    });
  }
}
//actualizacion de datos
controller.actualizardatos=(req,res)=>{
  if(req.session.active){
    uploads.single('foto')(req,res,function(err){
      if(err){
        throw err;
      }
      else{
        const {nombre,apellido,edad,telefono,direccion,sangre,fecnac,correo,clave} = req.body;
        if(req.file===undefined){
          var query2 = 'Update estudiante SET Nombre="'+nombre+'",Apellido="'+apellido+'",Edad="'+edad+'",Telefono="'+telefono+'",Direccion="'+direccion+'",TipoDeSangre="'+sangre+'",Fechanacimiento="'+fecnac+'" Where Documentoestudiante="'+req.session.identificacion+'"'
          mysql.query(query2,(err)=>{
            var query = 'Update usuario SET Correo="'+correo+'", Clave="'+clave+'" Where idusuarios="'+req.session.identificacion+'"';
            mysql.query(query,(err)=>{
              if(err){
                throw err;
              }
              else{
                req.session.nombre = nombre;
                req.session.apellido = apellido;
                res.redirect('/students/mis_datos')
              }
            })
          })
        }
        else{
          const image = '../students/' + req.file.filename
          var query2 = 'Update estudiante SET Nombre="'+nombre+'",Apellido="'+apellido+'",Edad="'+edad+'",Telefono="'+telefono+'",Direccion="'+direccion+'",TipoDeSangre="'+sangre+'",Fechanacimiento="'+fecnac+'" Where Documentoestudiante="'+req.session.identificacion+'"'
          mysql.query(query2,(err)=>{
            var query = 'Update usuario SET Correo="'+correo+'", Clave="'+clave+'", foto="'+image+'" Where idusuarios="'+req.session.identificacion+'"';            
            mysql.query(query,(err)=>{
              if(err){
                throw err;
              }
              else{
                req.session.nombre = nombre;
                req.session.apellido = apellido;
                req.session.image = image;
                res.redirect('/students/mis_datos')
              }
            })
          })
        } 
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
        res.render('estudiante/excusas',{
          data: resp,
          usuario: data,
          admin: { Nombre: req.session.nombre, Apellido: req.session.apellido }
        })
      }
    })
  }
  else {
    res.render("login", {
      Error: "Usted no tiene las credenciales para acceder a este sitio",
    });
  }
};
controller.getcertificados=(req,res)=>{
  if(req.session.active){
    const data = {
      rol: req.session.rol,
      foto: req.session.image,
    };
    res.render('estudiante/certificados',{
      usuario: data,
      admin: { Nombre: req.session.nombre, Apellido: req.session.apellido }
    })
  }
  else {
    res.render("login", {
      Error: "Usted no tiene las credenciales para acceder a este sitio",
    });
  }
}
controller.getpadres=(req,res)=>{
  if(req.session.active){
    mysql.query('Select * from padresacudientes where Documentoestudiantepad=?',[req.session.identificacion],(err,resbd)=>{
      if(err){
        throw err;
      }
      else{
        console.log(resbd)
        const data = {
          rol: req.session.rol,
          foto: req.session.image,
        };
        res.render('estudiante/padres',{
          usuario: data,
          admin: { Nombre: req.session.nombre, Apellido: req.session.apellido},
          padres: resbd
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
controller.vermisnotas=(req,res)=>{
  if(req.session.active){
    mysql.query('Select * from estudiantecurso Where idestudiante=? Group by idcurso',[req.session.identificacion],(err,resbd)=>{
      if(err){
        throw err;
      }
      else{
        let curso = resbd[0].idcurso
        var course = curso.toString();
        notas.find({Idenficacion:req.session.identificacion,curso:course},function (err,info) {
          if(err){
            throw err;
          }
          else{
            const data = {
              rol: req.session.rol,
              foto: req.session.image,
            };
            res.render('estudiante/cursos',{
              usuario: data,
              admin: { Nombre: req.session.nombre, Apellido: req.session.apellido},
              curso: info
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
controller.insertarpadre=(req,res)=>{
  if(req.session.identificacion){
    const id ={Documentoestudiantepad: req.session.identificacion}
    const data = Object.assign(id,req.body);
    mysql.query('Insert into padresacudientes set?',[data],(err)=>{
      if(err){
        throw err;
      }
      else{
        res.redirect('/students/padres')
      }
    })
  }
  else {
    res.render("login", {
      Error: "Usted no tiene las credenciales para acceder a este sitio",
    });
  }
}



module.exports = controller;